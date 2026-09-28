/* Navegação acessível e cintilação discreta da estufa. Sem dependências. */
const menuButton=document.querySelector('.menu-toggle');
const menu=document.querySelector('.nav-links');
const dropdown=document.querySelector('.dropdown');
const servicesButton=document.querySelector('.dropdown-trigger');
const mobileQuery=window.matchMedia('(max-width: 1199px)');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');

function closeDropdown(){dropdown.classList.remove('is-open');servicesButton.setAttribute('aria-expanded','false')}
function closeMenu(){menu.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Abrir menu');closeDropdown()}
function toggleDropdown(){const opened=dropdown.classList.toggle('is-open');servicesButton.setAttribute('aria-expanded',String(opened))}

menuButton.addEventListener('click',()=>{const opened=menu.classList.toggle('is-open');menuButton.setAttribute('aria-expanded',String(opened));menuButton.setAttribute('aria-label',opened?'Fechar menu':'Abrir menu');if(!opened)closeDropdown()});
servicesButton.addEventListener('click',toggleDropdown);
dropdown.addEventListener('mouseenter',()=>{if(!mobileQuery.matches)servicesButton.setAttribute('aria-expanded','true')});
dropdown.addEventListener('mouseleave',()=>{if(!mobileQuery.matches&&!dropdown.classList.contains('is-open'))servicesButton.setAttribute('aria-expanded','false')});
dropdown.addEventListener('focusout',event=>{if(!mobileQuery.matches&&!dropdown.contains(event.relatedTarget))closeDropdown()});
document.addEventListener('pointerdown',event=>{if(!dropdown.contains(event.target))closeDropdown();if(mobileQuery.matches&&!event.target.closest('.nav-bar'))closeMenu()});
document.addEventListener('keydown',event=>{if(event.key==='Escape'&&!document.querySelector('.gallery-dialog[open]')){closeMenu();if(mobileQuery.matches)menuButton.focus();else servicesButton.focus()}});
menu.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{if(link.dataset.service){const text=`Olá, gostaria de informações sobre ${link.dataset.service} na Controler Contabilidade.`;window.open(`https://wa.me/5541999683970?text=${encodeURIComponent(text)}`,'_blank','noopener,noreferrer')}if(mobileQuery.matches)closeMenu()}));
mobileQuery.addEventListener('change',closeMenu);

/* Pequenas variações de opacidade, sem alterar layout ou criar lampejos. */
const greenhouse=document.querySelector('.greenhouse-light');
const lake=document.querySelector('.lake-light');
let flickerTimer;
function subtleFlicker(){if(!greenhouse||!lake||reducedMotion.matches||document.hidden)return;const value=(.91+Math.random()*.09).toFixed(3);greenhouse.style.setProperty('--flicker',value);lake.style.setProperty('--flicker',(1.9-value).toFixed(3))}
function updateFlicker(){if(!greenhouse||!lake)return;clearInterval(flickerTimer);greenhouse.style.removeProperty('--flicker');lake.style.removeProperty('--flicker');if(!reducedMotion.matches)flickerTimer=setInterval(subtleFlicker,1900)}
reducedMotion.addEventListener('change',updateFlicker);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)subtleFlicker()});
updateFlicker();

/* Revela Quem Somos uma vez; sem IntersectionObserver ou JS, o CSS mantém os textos visíveis. */
const aboutSection=document.querySelector('.about');
if(aboutSection && 'IntersectionObserver' in window && !reducedMotion.matches){
  const aboutObserver=new IntersectionObserver(entries=>{
    if(entries.some(entry=>entry.isIntersecting)){
      aboutSection.classList.add('is-visible');
      aboutObserver.disconnect();
    }
  },{threshold:0.06,rootMargin:'0px 0px -5% 0px'});
  aboutObserver.observe(aboutSection);
  aboutSection.classList.add('about-motion-ready');
  reducedMotion.addEventListener('change',()=>{
    if(reducedMotion.matches){aboutSection.classList.add('is-visible');aboutObserver.disconnect()}
  });
}

/* Cards: observados individualmente para o efeito acontecer também ao rolar no celular. */
const aboutCards=[...document.querySelectorAll('.about-card')];
if(aboutCards.length && 'IntersectionObserver' in window && !reducedMotion.matches){
  const cardObserver=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){entry.target.classList.add('is-revealed');cardObserver.unobserve(entry.target)}
    });
  },{threshold:.12,rootMargin:'0px 0px -8% 0px'});
  aboutCards.forEach(card=>{cardObserver.observe(card);card.classList.add('card-motion-ready')});
  reducedMotion.addEventListener('change',()=>{
    if(reducedMotion.matches){aboutCards.forEach(card=>card.classList.add('is-revealed'));cardObserver.disconnect()}
  });
}

/* Calcula o reflexo apenas enquanto um mouse está sobre a faixa. */
const aboutClosing=document.querySelector('.about-closing');
const precisePointer=window.matchMedia('(hover: hover) and (pointer: fine)');
if(aboutClosing && precisePointer.matches){
  let pointerFrame=0;
  let pointerPosition;
  aboutClosing.addEventListener('pointermove',event=>{
    if(reducedMotion.matches || event.pointerType!=='mouse')return;
    pointerPosition={x:event.clientX,y:event.clientY};
    if(pointerFrame)return;
    pointerFrame=requestAnimationFrame(()=>{
      const bounds=aboutClosing.getBoundingClientRect();
      aboutClosing.style.setProperty('--about-glow-x',`${pointerPosition.x-bounds.left}px`);
      aboutClosing.style.setProperty('--about-glow-y',`${pointerPosition.y-bounds.top}px`);
      pointerFrame=0;
    });
  },{passive:true});
  aboutClosing.addEventListener('pointerleave',()=>{
    if(pointerFrame){cancelAnimationFrame(pointerFrame);pointerFrame=0}
  });
}

/* Depoimentos: desloca a faixa pela largura real de cada cartão, sem autoplay. */
const testimonialsStage=document.querySelector('#testimonials-stage');
if(testimonialsStage){
  const reviews=[...testimonialsStage.querySelectorAll('.testimonial')];
  const track=testimonialsStage.querySelector('.testimonials-track');
  const counter=document.querySelector('#testimonial-counter');
  const progress=document.querySelector('#testimonial-progress');
  const reviewDialog=document.querySelector('#testimonial-dialog');
  const dialogTitle=reviewDialog.querySelector('#testimonial-dialog-title');
  const dialogText=reviewDialog.querySelector('#testimonial-dialog-text');
  let lastReviewTrigger=null;
  let currentReview=0;
  let touchStart=null;
  function positionReview(){
    const distance=reviews[currentReview].offsetLeft-reviews[0].offsetLeft;
    track.style.transform=`translate3d(${-distance}px,0,0)`;
  }
  function updateMoreButtons(){
    // O navegador informa se o texto real ultrapassa as quatro linhas visíveis.
    reviews.forEach((review,index)=>{
      const quote=review.querySelector('blockquote');
      const more=review.querySelector('.testimonial-more');
      more.hidden=quote.scrollHeight<=quote.clientHeight+1;
      more.tabIndex=index===currentReview?0:-1;
    });
  }
  function showReview(next){
    currentReview=(next+reviews.length)%reviews.length;
    reviews.forEach((review,index)=>{
      review.setAttribute('aria-hidden',String(index!==currentReview));
      review.querySelector('.testimonial-more').tabIndex=index===currentReview?0:-1;
    });
    counter.textContent=`${String(currentReview+1).padStart(2,'0')} / ${String(reviews.length).padStart(2,'0')}`;
    progress.value=currentReview+1;
    positionReview();
  }
  testimonialsStage.classList.add('is-enhanced');
  showReview(0);
  updateMoreButtons();
  reviews.forEach(review=>review.querySelector('.testimonial-more').addEventListener('click',event=>{
    lastReviewTrigger=event.currentTarget;
    dialogTitle.textContent=review.querySelector('figcaption strong').textContent;
    dialogText.innerHTML=review.querySelector('blockquote').innerHTML;
    reviewDialog.showModal();
  }));
  reviewDialog.querySelector('.testimonial-dialog-close').addEventListener('click',()=>reviewDialog.close());
  reviewDialog.addEventListener('close',()=>lastReviewTrigger?.focus());
  document.querySelector('#testimonial-prev').addEventListener('click',()=>showReview(currentReview-1));
  document.querySelector('#testimonial-next').addEventListener('click',()=>showReview(currentReview+1));
  testimonialsStage.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();showReview(currentReview-1)}
    if(event.key==='ArrowRight'){event.preventDefault();showReview(currentReview+1)}
  });
  window.addEventListener('resize',()=>{positionReview();updateMoreButtons()},{passive:true});
  if(document.fonts)document.fonts.ready.then(()=>{positionReview();updateMoreButtons()});
  testimonialsStage.addEventListener('touchstart',event=>{
    if(window.innerWidth>=768 || event.touches.length!==1)return;
    touchStart={x:event.touches[0].clientX,y:event.touches[0].clientY};
  },{passive:true});
  testimonialsStage.addEventListener('touchend',event=>{
    if(!touchStart || !event.changedTouches.length)return;
    const dx=event.changedTouches[0].clientX-touchStart.x;
    const dy=event.changedTouches[0].clientY-touchStart.y;
    touchStart=null;
    if(Math.abs(dx)>55 && Math.abs(dx)>Math.abs(dy)*1.4)showReview(currentReview+(dx<0?1:-1));
  },{passive:true});
  testimonialsStage.addEventListener('touchcancel',()=>{touchStart=null});
}

/* Galeria modal: seis fotos reais, troca manual e restauração do foco ao fechar. */
const galleryDialog=document.querySelector('.gallery-dialog');
if(galleryDialog && typeof galleryDialog.showModal==='function'){
  const photos=[...document.querySelectorAll('.gallery-sources li')].map(item=>({src:item.dataset.src,alt:item.dataset.alt}));
  const galleryImage=galleryDialog.querySelector('.gallery-view img');
  const galleryCount=galleryDialog.querySelector('.gallery-count');
  let galleryIndex=0;
  let galleryOpener=null;
  function showPhoto(index){
    galleryIndex=(index+photos.length)%photos.length;
    galleryImage.src=photos[galleryIndex].src;
    galleryImage.alt=photos[galleryIndex].alt;
    galleryCount.textContent=`${String(galleryIndex+1).padStart(2,'0')} / ${String(photos.length).padStart(2,'0')}`;
  }
  document.querySelectorAll('[data-gallery-index]').forEach(link=>link.addEventListener('click',event=>{
    event.preventDefault();
    galleryOpener=link;
    showPhoto(Number(link.dataset.galleryIndex));
    galleryDialog.showModal();
    document.body.classList.add('gallery-open');
    galleryDialog.querySelector('.gallery-close').focus();
  }));
  galleryDialog.querySelector('.gallery-prev').addEventListener('click',()=>showPhoto(galleryIndex-1));
  galleryDialog.querySelector('.gallery-next').addEventListener('click',()=>showPhoto(galleryIndex+1));
  galleryDialog.querySelector('.gallery-close').addEventListener('click',()=>galleryDialog.close());
  galleryDialog.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();showPhoto(galleryIndex-1)}
    if(event.key==='ArrowRight'){event.preventDefault();showPhoto(galleryIndex+1)}
  });
  galleryDialog.addEventListener('close',()=>{
    document.body.classList.remove('gallery-open');
    galleryImage.removeAttribute('src');
    if(galleryOpener)galleryOpener.focus();
  });
}

/* O formulário prepara a conversa; o visitante confirma o envio no WhatsApp. */
function buildContactMessage(data){
  const lines=[
    'Olá, vim pelo site da Controler Contabilidade.',
    '',
    `Seu nome: ${data.name}`,
    ...(data.situation==='Já tenho empresa'?[`Nome da empresa: ${data.company}`]:[]),
    `Cidade e estado: ${data.city}`,
    `Seu WhatsApp: ${data.phone}`,
    `Qual é a sua situação?: ${data.situation}`,
    `Em que podemos ajudar?: ${data.subject}`,
    ...(data.message?[`Conte brevemente o que você precisa: ${data.message}`]:[]),
    ...(data.preference?[`Como prefere ser atendido?: ${data.preference}`]:[])
  ];
  return lines.join('\n');
}

const contactForm=document.querySelector('#contact-form');
if(contactForm){
  const fields={
    name:contactForm.querySelector('#contact-name'),
    company:contactForm.querySelector('#contact-company'),
    city:contactForm.querySelector('#contact-city'),
    phone:contactForm.querySelector('#contact-phone'),
    situation:contactForm.querySelector('fieldset.contact-options'),
    subject:contactForm.querySelector('#contact-subject')
  };
  const companyWrap=contactForm.querySelector('.contact-company');
  const companyMark=contactForm.querySelector('.company-required');
  const situationRadios=[...contactForm.querySelectorAll('input[name="situation"]')];
  function setContactError(key,message){
    contactForm.querySelector(`#contact-${key}-error`).textContent=message;
    if(message)fields[key].setAttribute('aria-invalid','true');
    else fields[key].removeAttribute('aria-invalid');
  }
  function selectedValue(name){return contactForm.querySelector(`input[name="${name}"]:checked`)?.value||''}
  function updateCompany(){
    const isEstablished=selectedValue('situation')==='Já tenho empresa';
    companyWrap.hidden=!!selectedValue('situation')&&!isEstablished;
    companyMark.hidden=!isEstablished;
    fields.company.required=isEstablished;
    if(!isEstablished)setContactError('company','');
    setContactError('situation','');
  }
  situationRadios.forEach(radio=>radio.addEventListener('change',updateCompany));
  ['name','company','city','phone'].forEach(key=>fields[key].addEventListener('input',()=>setContactError(key,'')));
  fields.subject.addEventListener('change',()=>setContactError('subject',''));
  contactForm.addEventListener('submit',event=>{
    event.preventDefault();
    const data={
      name:fields.name.value.trim(),company:fields.company.value.trim(),city:fields.city.value.trim(),
      phone:fields.phone.value.trim(),situation:selectedValue('situation'),subject:fields.subject.value,
      message:contactForm.querySelector('#contact-message').value.trim(),preference:selectedValue('preference')
    };
    setContactError('name',data.name?'':'Informe seu nome.');
    setContactError('company',data.situation==='Já tenho empresa'&&!data.company?'Informe o nome da empresa.':'');
    setContactError('city',data.city?'':'Informe sua cidade e estado.');
    const digits=data.phone.replace(/\D/g,'');
    setContactError('phone',!data.phone?'Informe seu WhatsApp.':digits.length<10||digits.length>13?'Informe um número com DDD válido.':'');
    setContactError('situation',data.situation?'':'Selecione sua situação.');
    setContactError('subject',data.subject?'':'Selecione o assunto.');
    const firstInvalid=Object.entries(fields).find(([,field])=>field.getAttribute('aria-invalid')==='true');
    if(firstInvalid){
      (firstInvalid[0]==='situation'?situationRadios[0]:firstInvalid[1]).focus();
      return;
    }
    const url=`https://wa.me/5541999683970?text=${encodeURIComponent(buildContactMessage(data))}`;
    window.open(url,'_blank','noopener,noreferrer');
  });
}

/* Serviços do rodapé aponta para o submenu de serviços que já existe no cabeçalho. */
const footerServices=document.querySelector('.footer-services');
if(footerServices){
  footerServices.addEventListener('click',event=>{
    event.preventDefault();
    if(mobileQuery.matches){
      menu.classList.add('is-open');
      menuButton.setAttribute('aria-expanded','true');
      menuButton.setAttribute('aria-label','Fechar menu');
    }
    dropdown.classList.add('is-open');
    servicesButton.setAttribute('aria-expanded','true');
    window.scrollTo({top:0,behavior:reducedMotion.matches?'auto':'smooth'});
    servicesButton.focus({preventScroll:true});
  });
}
