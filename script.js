const btn = document.getElementById('menu-btn');
const menu = document.getElementById('mobile-menu');
const links = document.querySelectorAll('.mobile-link');

// Toggle menu visibility
btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
    menu.classList.toggle('flex');
});

// Automatically collapse menu after link selection
links.forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.add('hidden');
        menu.classList.remove('flex');
    });
});

// --- DATA ---
const galleryData = [
    { id: 1, type: 'fruit', title: 'Pomegranate Fruit', url: '5.jpg' },
    { id: 2, type: 'orchard', title: 'Pomegranate Plant', url: '4.jpg' },
    { id: 3, type: 'life', title: 'Farm Trip', url: '6.jpg' },
    { id: 4, type: 'fruit', title: 'Pomegranate Stock', url: '1.jpg' },
    { id: 5, type: 'orchard', title: 'Pomegranate Farm', url: '7.jpg' },
    { id: 6, type: 'life', title: 'Farm Work', url: '8.jpg' },
    { id: 7, type: 'fruit', title: 'Pomegranate Packing', url: '9.jpg' },
    { id: 8, type: 'orchard', title: 'Farm Soil', url: '10.jpg' },
    { id: 9, type: 'life', title: 'Farm Sunshine', url: '3.jpg' }
];

const seasons = {
    monsoon: {
        title: "Monsoon: Rest Time",
        desc: "Since it rains mostly not much can be done at the farm. It is that time of the year when the farm gets soaked in water.",
        img: "4.jpg",
    },
    spring: {
        title: "Spring: Flowers Appear",
        desc: "Post monsoon the plant goes green and flowers start to bloom. These flowers will then turn into the pomegranate fruit.",
        img: "7.jpg",
    },
    winter: {
        title: "Winter: Fruits Grow",
        desc: "Fruits slowly grow into bigger size requiring more water. We use high-precision drip irrigation to minimize water waste while keeping the trees hydrated.",
        img: "8.jpg",
    },
    summer: {
        title: "Summer: Harvest Time",
        desc: "This is our peak. Fruits are full grown and is hand-picked to avoid bruising. It is then packed into boxes and is sent to the market for further selling.",
        img: "5.jpg",
    }
};

// --- APP LOGIC ---
const app = {
    init: function () {
        this.renderGallery('all');
        this.setSeason('monsoon');
        this.initCharts();

        // Sticky Nav Effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.classList.add('shadow-lg');
            } else {
                header.classList.remove('shadow-lg');
            }
        });
    },

    renderGallery: function (filter) {
        const container = document.getElementById('galleryContainer');
        container.innerHTML = '';

        const filtered = filter === 'all' ? galleryData : galleryData.filter(i => i.type === filter);

        filtered.forEach(item => {
            const el = document.createElement('div');
            el.className = 'gallery-item fade-in';
            el.innerHTML = `
                <img src="${item.url}" alt="${item.title}">
                <div class="gallery-overlay">
                    <div class="text-white">
                        <p class="text-xs uppercase tracking-widest opacity-70">${item.type}</p>
                        <h4 class="text-xl serif font-bold">${item.title}</h4>
                    </div>
                </div>
            `;
            container.appendChild(el);
        });
    },

    filterGallery: function (filter, event) {
        // 1. Reset all buttons to the default state (White background, Black text)
        document.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-[#8b0000]', 'text-white');
            b.classList.add('bg-white', 'text-black');
        });

        // 2. Update the clicked button (Active state)
        // We use event.currentTarget to ensure we grab the button even if text inside is clicked
        if (event && event.currentTarget) {
            const btn = event.currentTarget;
            btn.classList.remove('bg-white', 'text-black');
            btn.classList.add('bg-[#8b0000]', 'text-white');
        }

        // 3. Update the gallery items
        this.renderGallery(filter);
    },

    setSeason: function (key, event) {
        const data = seasons[key];
        const display = document.getElementById('seasonDisplay');

        // Update Nav UI
        document.querySelectorAll('.season-btn').forEach(b => {
            b.classList.remove('bg-white', 'text-black');
            b.classList.add('text-white');
        });

        if (event && event.target) {
            const clickedBtn = event.target.closest('button');
            if (clickedBtn) {
                clickedBtn.classList.remove('text-white');
                clickedBtn.classList.add('bg-white', 'text-black');
            }
        }

        display.innerHTML = `
            <div class="fade-in">
                <h4 class="text-6xl serif mb-6">${data.title}</h4>
                <p class="text-stone-300 text-lg leading-relaxed mb-8">${data.desc}</p>
                <ul class="space-y-3 text-sm font-semibold uppercase tracking-tighter">
                    <li class="flex items-center space-x-3"><span class="w-2 h-2 bg-[#8b0000] rounded-full"></span> <span>Experience the journey</span></li>
                    <li class="flex items-center space-x-3"><span class="w-2 h-2 bg-[#8b0000] rounded-full"></span> <span>Get Pomegranates fresh from farm</span></li>
                </ul>
            </div>
            <div class="fade-in relative">
                <div class="aspect-square rounded-full overflow-hidden border-8 border-stone-800 shadow-2xl">
                    <img src="${data.img}" class="w-full h-full object-cover" alt="${data.title}">
                </div>
            </div>
        `;
    },

    initCharts: function () {
        // Yield Chart
        new Chart(document.getElementById('yieldChart'), {
            type: 'bar',
            data: {
                labels: ['2023', '2024', '2025', '2026'],
                datasets: [{
                    data: [3, 4, 5, 4],
                    backgroundColor: '#8b0000',
                    borderRadius: 10
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { display: true }, x: { grid: { display: false } } }
            }
        });

        // Brix Chart
        new Chart(document.getElementById('brixChart'), {
            type: 'line',
            data: {
                labels: ['Sep', 'Oct', 'Nov', 'Dec', 'Jan'],
                datasets: [{
                    data: [50, 100, 150, 200, 300],
                    borderColor: '#8b0000',
                    tension: 0.4,
                    fill: false
                }]
            },
            options: {
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: { y: { display: true }, x: { grid: { display: false } } }
            }
        });
    }
};

app.init();

