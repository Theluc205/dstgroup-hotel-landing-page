const progress = document.querySelector('.scroll-progress');
const nav = document.querySelector('.nav');
const menu = document.querySelector('#menu');
const toggle = document.querySelector('.mobile-toggle');

function updateScrollUI(){
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? (window.scrollY / max) * 100 : 0;
  progress.style.width = ratio + '%';
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', updateScrollUI, {passive:true});
updateScrollUI();

if(toggle){
  toggle.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
}

document.querySelectorAll('.menu a').forEach(a => {
  a.addEventListener('click', () => menu.classList.remove('open'));
});

const io = new IntersectionObserver((entries)=>{
  entries.forEach((entry)=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
      io.unobserve(entry.target);
    }
  });
},{threshold:.14});
document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

document.querySelectorAll('.magnetic').forEach(btn=>{
  btn.addEventListener('mousemove', e=>{
    const rect = btn.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * .16;
    const y = (e.clientY - rect.top - rect.height / 2) * .16;
    btn.style.transform = `translate(${x}px, ${y}px)`;
  });
  btn.addEventListener('mouseleave',()=>{btn.style.transform='translate(0,0)';});
});

const form = document.querySelector('#consultForm');
if(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    alert('DSTGROUP đã nhận yêu cầu tư vấn. Bạn có thể đổi form này sang gửi Google Sheets/Zalo/Email.');
  });
}
