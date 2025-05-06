document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.menu-nav-item');
    
    // פונקציה שמזהה איזה סקשן נמצא בתצוגה
    function getCurrentSection() {
        let current = '';
        const scrollPosition = window.pageYOffset;

        sections.forEach(section => {
            // מחשב את המיקום של הסקציה בדף
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // מוסיף מרווח של 150px מלמעלה לזיהוי מדויק יותר
            if (scrollPosition >= sectionTop - 180) {
                current = section.getAttribute('id');
            }
        });
        
        return current;
    }
    
    // פונקציה שמעדכנת את הקטגוריה הפעילה
    function setActiveCategory() {
        const currentSection = getCurrentSection();
        
        navItems.forEach(item => {
            // מסיר את הקלאס active מכל הקטגוריות
            item.classList.remove('active');
            
            // מוסיף את הקלאס active לקטגוריה הנוכחית
            if (item.getAttribute('href').slice(1) === currentSection) {
                item.classList.add('active');
            }
        });
    }
    
    // מאזין לאירוע גלילה
    window.addEventListener('scroll', setActiveCategory);
    
    // מאזין ללחיצה על לינקים בניווט
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const targetSection = document.getElementById(targetId);
            
            // גולל לסקציה עם התחשבות במרווח העליון
            window.scrollTo({
                top: targetSection.offsetTop - 180,
                behavior: 'smooth'
            });
        });
    });
    
    // מפעיל בטעינת הדף
    setActiveCategory();
});

// התאמת גובה אוטומטית ל-iframes
function adjustIframeHeight() {
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        iframe.onload = function() {
            iframe.style.height = iframe.contentWindow.document.body.scrollHeight + 'px';
        }
    });
}

document.addEventListener('DOMContentLoaded', adjustIframeHeight);

// בדף הראשי - מוסיפים את זה לקובץ הקיים
window.addEventListener('message', function(event) {
    if (event.data.type === 'scrollTo') {
        const element = document.querySelector(event.data.id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});