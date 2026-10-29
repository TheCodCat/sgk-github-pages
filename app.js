// Укажите ссылку на чат приёмной комиссии. Пустая строка открывает контакты.
const CHAT_URL = '';

const filterButtons=[...document.querySelectorAll('[data-filter]')];
const programs=[...document.querySelectorAll('.program')];
const search=document.querySelector('#search');
let category='all';

function filterPrograms(){
  let count=0;
  const query=search.value.trim().toLocaleLowerCase('ru');
  programs.forEach(p=>{
    const visible=(category==='all'||p.dataset.category===category)&&p.dataset.name.toLocaleLowerCase('ru').includes(query);
    p.hidden=!visible;
    if(visible)count++;
  });
  document.querySelector('.empty-state').hidden=count>0;
  document.querySelector('#program-grid').hidden=count===0;
}

filterButtons.forEach(b=>b.addEventListener('click',()=>{
  category=b.dataset.filter;
  filterButtons.forEach(x=>{
    const active=x===b;
    x.classList.toggle('active',active);
    x.setAttribute('aria-pressed',active);
  });
  filterPrograms();
}));

search.addEventListener('input',filterPrograms);

document.querySelector('#reset-search').addEventListener('click',()=>{
  search.value='';
  filterButtons[0].click();
});

const menu=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');

menu.addEventListener('click',()=>{
  const open=menu.getAttribute('aria-expanded')!=='true';
  menu.setAttribute('aria-expanded',open);
  nav.classList.toggle('open',open);
});

nav.addEventListener('click',e=>{
  if(e.target.closest('a,button')){
    nav.classList.remove('open');
    menu.setAttribute('aria-expanded','false');
  }
});

const dialog=document.querySelector('#info-dialog');

const content={
  target:'<h2>Целевое обучение</h2><p>Узнай о предложениях работодателей и порядке заключения договора о целевом обучении на официальном сайте колледжа.</p><p><a href="https://samgk.ru/admission/infopriem" target="_blank" rel="noopener">Открыть информацию о приёме ↗</a></p><p>Приёмная комиссия: <a href="tel:+78463325949">+7 (846) 332-59-49</a></p>',
  
  exams:'<h2>Вступительные испытания</h2><p>Для отдельных специальностей предусмотрены вступительные испытания. Проверь программу, расписание и условия на официальном сайте колледжа.</p><p><a href="https://samgk.ru/admission/infopriem" target="_blank" rel="noopener">Условия приёма и вступительных испытаний ↗</a></p>',
  
  gosuslugi:'<h2>Подача через Госуслуги</h2><ol><li>Войди в подтверждённую учётную запись на Госуслугах.</li><li>Найди услугу поступления в колледж.</li><li>Выбери Самарский государственный колледж и интересующие специальности.</li><li>Проверь данные, приложи необходимые документы и отправь заявление.</li><li>Следи за уведомлениями в личном кабинете.</li></ol><p><a href="https://www.gosuslugi.ru/" target="_blank" rel="noopener">Открыть Госуслуги ↗</a></p><p><a href="https://samgk.ru/admission/zayavlenie/" target="_blank" rel="noopener">Информация о подаче заявления на сайте колледжа ↗</a></p>',
  
  teacher:'<h2>44.02.02 Преподавание в начальных классах</h2><img class="dialog-img" src="assets/80307ac5-fef4-4671-94c3-6c975f388ad9.jfif" alt="Макет страницы специальности «Преподавание в начальных классах»">',
  
  chat:'<h2>Связаться с приёмной комиссией</h2><p>Ссылка на чат пока не подключена. Позвони в приёмную комиссию или открой официальный сайт для выбора удобного способа связи.</p><p><a href="tel:+78463325949">+7 (846) 332-59-49</a></p><p><a href="https://abits.samgk.ru/" target="_blank" rel="noopener">Открыть сайт приёмной комиссии ↗</a></p>'
};

// Обработчик для диалогов
document.querySelectorAll('[data-dialog]').forEach(element=>{
  element.addEventListener('click',(event)=>{
    event.preventDefault();
    event.stopPropagation();
    
    console.log('Клик по элементу:', element.dataset.dialog);
    
    if (element.dataset.dialog === 'chat' && /^https?:\/\//i.test(CHAT_URL)) {
      window.open(CHAT_URL, '_blank', 'noopener,noreferrer');
      return;
    }
    
    const dialogContent = content[element.dataset.dialog];
    if (dialogContent) {
      document.querySelector('#dialog-body').innerHTML = dialogContent;
      dialog.showModal();
    } else {
      console.error('Контент для', element.dataset.dialog, 'не найден');
    }
  });
});

// Закрытие диалога
document.querySelector('.close-dialog').addEventListener('click',()=>{
  dialog.close();
});

dialog.addEventListener('click',(e)=>{
  if(e.target===dialog){
    const r=dialog.getBoundingClientRect();
    if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom){
      dialog.close();
    }
  }
});