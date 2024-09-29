// Lógica do carrossel de imagens
let currentSlide = 0;

function moveSlide(direction) {
    const slides = document.querySelectorAll('.carousel-images img');
    const totalSlides = slides.length;

    // Atualizar o índice do slide atual
    currentSlide += direction;

    // Verificar limites do carrossel
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1; // Volta para o último slide
    } else if (currentSlide >= totalSlides) {
        currentSlide = 0; // Volta para o primeiro slide
    }

    // Mover a galeria de imagens
    const offset = -currentSlide * 100; // Calcular o deslocamento
    document.querySelector('.carousel-images').style.transform = `translateX(${offset}%)`;
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdown-menu');
    if (dropdownMenu.style.display === 'block') {
        dropdownMenu.style.display = 'none'; // Fecha o menu se estiver aberto
    } else {
        dropdownMenu.style.display = 'block'; // Abre o menu
    }
}

// Fecha o dropdown se o usuário clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.dropdown-btn')) {
        const dropdowns = document.getElementsByClassName("dropdown-content");
        for (let i = 0; i < dropdowns.length; i++) {
            const openDropdown = dropdowns[i];
            if (openDropdown.style.display === 'block') {
                openDropdown.style.display = 'none';
            }
        }
    }
}

// Elementos do DOM
const monthYear = document.getElementById('month-year');
const daysContainer = document.getElementById('days');
const prevMonthBtn = document.getElementById('prev-month');
const nextMonthBtn = document.getElementById('next-month');
const appointmentType = document.getElementById('appointment-type');
const timeButtons = document.getElementById('time-buttons');

// Datas atuais
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

// Nomes dos meses
const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio',
    'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro',
    'Novembro', 'Dezembro'
];

// Função para gerar o calendário
function generateCalendar(month, year) {
    monthYear.textContent = `${months[month]} ${year}`;
    daysContainer.innerHTML = '';

    const firstDay = new Date(year, month).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Adicionar dias vazios antes do primeiro dia do mês
    for (let i = 0; i < firstDay; i++) {
        const emptySpan = document.createElement('span');
        daysContainer.appendChild(emptySpan);
    }

    // Adicionar os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const daySpan = document.createElement('span');
        daySpan.textContent = day;

        // Adicionar evento de clique ao dia
        daySpan.addEventListener('click', () => {
            document.querySelectorAll('.days span').forEach(s => s.classList.remove('selected'));
            daySpan.classList.add('selected');
            // alert(`Você selecionou: ${day} de ${months[month]} de ${year}`);
        });

        daysContainer.appendChild(daySpan);
    }
}

// Função para mudar o mês
function changeMonth(direction) {
    if (direction === 'next') {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
    } else if (direction === 'prev') {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
    }
    generateCalendar(currentMonth, currentYear);
}

// Inicializar o calendário
generateCalendar(currentMonth, currentYear);

// Adicionar eventos aos botões
prevMonthBtn.addEventListener('click', () => changeMonth('prev'));
nextMonthBtn.addEventListener('click', () => changeMonth('next'));

// Mostrar/ocultar botões de horário com base no tipo de agendamento
appointmentType.addEventListener('change', () => {
    timeButtons.style.display = appointmentType.value === 'procedure' ? 'block' : 'none';
});
