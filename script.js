const root=document.documentElement;
const themeToggle=document.querySelector('.theme-toggle');
const menuToggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.nav');
const navLinks=document.querySelectorAll('.nav-link');
const savedTheme=localStorage.getItem('theme');
const prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;

function setTheme(theme){
  root.dataset.theme=theme;
  localStorage.setItem('theme',theme);
  themeToggle.setAttribute('aria-label',theme==='dark'?'Bat che do sang':'Bat che do toi');
  document.querySelector('meta[name=theme-color]').setAttribute('content',theme==='dark'?'#111522':'#f7f8fc');
}

setTheme(savedTheme||(prefersDark?'dark':'light'));
themeToggle.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));

menuToggle.addEventListener('click',()=>{
  const isOpen=navigation.classList.toggle('open');
  menuToggle.classList.toggle('open',isOpen);
  menuToggle.setAttribute('aria-expanded',String(isOpen));
});

navLinks.forEach(link=>link.addEventListener('click',()=>{
  navigation.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}
  });
},{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));

const sectionObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting)navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`));
  });
},{rootMargin:'-40% 0px -50%',threshold:0});
document.querySelectorAll('main section[id]').forEach(section=>sectionObserver.observe(section));

window.addEventListener('scroll',()=>document.querySelector('.site-header').classList.toggle('scrolled',window.scrollY>12));
document.querySelector('#year').textContent=new Date().getFullYear();
