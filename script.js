const menuToggle=document.querySelector('.menu-toggle');
const navigation=document.querySelector('.nav');

menuToggle.addEventListener('click',()=>{
  const isOpen=navigation.classList.toggle('open');
  menuToggle.classList.toggle('open',isOpen);
  menuToggle.setAttribute('aria-expanded',String(isOpen));
});

document.querySelectorAll('.nav a').forEach(link=>link.addEventListener('click',()=>{
  navigation.classList.remove('open');
  menuToggle.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
}));

const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:.12});

document.querySelectorAll('.reveal').forEach(element=>revealObserver.observe(element));
