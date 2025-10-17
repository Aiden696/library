//кастомизация select
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('select-header')) {
        const list = e.target.nextElementSibling;
        
        document.querySelectorAll('.select-list').forEach(otherList => {
            if (otherList !== list) otherList.classList.remove('show');
        });

        list.classList.toggle('show');
    } else if (e.target.classList.contains('select-option')) {
        const header = e.target.closest('.choiceItem').querySelector('.select-header');
        const list = e.target.closest('.select-list');
        
        header.textContent = e.target.textContent;
        list.classList.remove('show');
    } else {
        document.querySelectorAll('.select-list').forEach(list => {
            list.classList.remove('show');
        });
    }
});

//далее