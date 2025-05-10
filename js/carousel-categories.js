function initializeModal() {
    const modalHTML = `
        <div class="modal-overlay"></div>
        <div class="modal">
            <button class="close-modal">×</button>
            <div class="modal-content">
                <img src="" alt="" class="modal-image">
                <div class="modal-details">
                    <h3 class="modal-title"></h3>
                    <p class="modal-description"></p>
                    <span class="modal-price"></span>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.querySelector('.modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const closeModal = document.querySelector('.close-modal');

    // סגירת המודל
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
    });

    modalOverlay.addEventListener('click', () => {
        modal.style.display = 'none';
        modalOverlay.style.display = 'none';
    });
}

function initializeMenuItems() {
    document.querySelectorAll('.menu-item').forEach(item => {
        item.addEventListener('click', () => {
            const modal = document.querySelector('.modal');
            const modalOverlay = document.querySelector('.modal-overlay');
            
            // מקבל את הנתונים ישירות מהאלמנט
            const itemData = {
                image: item.querySelector('.item-image').src,
                title: item.querySelector('.item-title').textContent,
                description: item.querySelector('.item-description').textContent,
                price: item.querySelector('.item-price').textContent
            };

            // מעדכן את המודל ישירות
            modal.querySelector('.modal-image').src = itemData.image;
            modal.querySelector('.modal-image').alt = itemData.title;
            modal.querySelector('.modal-title').textContent = itemData.title;
            modal.querySelector('.modal-description').textContent = itemData.description;
            modal.querySelector('.modal-price').textContent = itemData.price;

            // מציג את המודל
            modal.style.display = 'block';
            modalOverlay.style.display = 'block';
        });
    });
}

// קוד לניווט
function initializeNavigation() {
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
            
            // מוסיף מרווח של 220px מלמעלה לזיהוי מדויק יותר
            if (scrollPosition >= sectionTop - 220) {
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
                top: targetSection.offsetTop - 220,
                behavior: 'smooth'
            });
        });
    });
    
    // מפעיל בטעינת הדף
    setActiveCategory();
}

document.addEventListener('DOMContentLoaded', function() {
    initializeModal();
    initializeNavigation();
    initializeMenuItems();
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

// בדף הראשי - מוסיפים את זה לקובץ הקיים
window.addEventListener('message', function(event) {
    if (event.data.type === 'scrollTo') {
        const element = document.querySelector(event.data.id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

function scrollToFooter(e) {
    e.preventDefault();
    document.querySelector('footer').scrollIntoView({ behavior: 'smooth' });
}