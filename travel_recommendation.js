const travelData = {
            countries: [
                {
                    name: "Australia",
                    cities: [
                        { name: "Sydney", imageUrl: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", description: "Vibrant city known for its iconic Opera House and beautiful harbor.", timeZone: "Australia/Sydney" },
                        { name: "Melbourne", imageUrl: "https://images.unsplash.com/photo-1514395462725-fb4566210144?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", description: "Cultural capital with diverse arts, alleys, and amazing coffee.", timeZone: "Australia/Melbourne" }
                    ]
                },
                {
                    name: "Japan",
                    cities: [
                        { name: "Tokyo", imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", description: "Bustling metropolis blending ultramodern neon with traditional temples.", timeZone: "Asia/Tokyo" },
                        { name: "Kyoto", imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", description: "Famous for classical Buddhist temples, gardens, and Shinto shrines.", timeZone: "Asia/Tokyo" }
                    ]
                }
            ],
            temples: [
                { name: "Angkor Wat", imageUrl: "https://images.unsplash.com/photo-1600577916048-804c9191e36c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", description: "A temple complex in Cambodia, the largest religious monument in the world.", timeZone: "Asia/Phnom_Penh" },
                { name: "Taj Mahal", imageUrl: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", description: "An ivory-white marble mausoleum on the right bank of the river Yamuna.", timeZone: "Asia/Kolkata" }
            ],
            beaches: [
                { name: "Bora Bora", imageUrl: "https://images.unsplash.com/photo-1588392382834-a8d118127400?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", description: "A small South Pacific island famous for its turquoise lagoon.", timeZone: "Pacific/Tahiti" },
                { name: "Copacabana", imageUrl: "https://images.unsplash.com/photo-1549472398-333e8b030b77?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60", description: "A vibrant and iconic beach located in Rio de Janeiro, Brazil.", timeZone: "America/Sao_Paulo" }
            ]
        };

        // Navigation Logic
        function showSection(sectionId) {
            document.getElementById('home').classList.add('section-hidden');
            document.getElementById('about').classList.add('section-hidden');
            document.getElementById('contact').classList.add('section-hidden');
            
            document.getElementById(sectionId).classList.remove('section-hidden');
            
            const navSearch = document.getElementById('nav-search');
            const nav = document.querySelector('nav');
            
            if (sectionId === 'home') {
                navSearch.classList.remove('hidden');
                navSearch.classList.add('md:flex');
                nav.classList.add('bg-white/10', 'backdrop-blur-md');
                nav.classList.remove('bg-gray-900');
            } else {
                navSearch.classList.add('hidden');
                navSearch.classList.remove('md:flex');
                nav.classList.remove('bg-white/10', 'backdrop-blur-md');
                nav.classList.add('bg-gray-900');
            }
        }

        function submitForm(e) {
            e.preventDefault();
            alert("Thank you for reaching out! We'll get back to you shortly.");
            e.target.reset();
        }

        function getCurrentTime(timeZone) {
            try {
                const options = { timeZone: timeZone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
                return new Date().toLocaleTimeString('en-US', options);
            } catch (err) {
                return "Time Unavailable";
            }
        }

        // Search Logic
        function performSearch() {
            const input = document.getElementById('search-input').value.toLowerCase().trim();
            const resultsContainer = document.getElementById('results-container');
            const resultsWrapper = document.getElementById('results-wrapper');
            
            resultsContainer.innerHTML = '';0
            
            if (!input) {
                clearSearch();
                return;
            }

            let results = [];


            if (input.includes('beach')) {
                results = travelData.beaches;
            } else if (input.includes('temple')) {
                results = travelData.temples;
            } else if (input.includes('country') || input.includes('countries')) {
                travelData.countries.forEach(country => results.push(...country.cities));
            } else {

                const foundCountry = travelData.countries.find(c => c.name.toLowerCase().includes(input));
                if (foundCountry) {
                    results = foundCountry.cities;
                }
            }

            if (results.length > 0) {
                resultsWrapper.classList.remove('hidden');
                results.forEach(item => {
                    const localTime = getCurrentTime(item.timeZone);
                    
                    const cardHTML = `
                        <div class="bg-white rounded-xl overflow-hidden shadow-lg transform transition hover:scale-105">
                            <img src="${item.imageUrl}" alt="${item.name}" class="w-full h-48 object-cover">
                            <div class="p-5">
                                <h3 class="text-xl font-bold text-gray-900 mb-2">${item.name}</h3>
                                <p class="text-gray-600 text-sm mb-4 h-12 overflow-hidden">${item.description}</p>
                                <div class="bg-teal-50 p-3 rounded-lg text-sm text-teal-800 flex items-center justify-between">
                                    <span class="font-semibold"><i class="fa-regular fa-clock mr-1"></i> Local Time:</span>
                                    <span>${localTime}</span>
                                </div>
                                <button class="mt-4 w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-lg font-medium transition">Visit</button>
                            </div>
                        </div>
                    `;
                    resultsContainer.innerHTML += cardHTML;
                });
            } else {
                resultsWrapper.classList.remove('hidden');
                resultsContainer.innerHTML = `<p class="text-white text-lg col-span-full">No recommendations found for "${input}". Try 'beach', 'temple', or 'japan'.</p>`;
            }
        }

        function clearSearch() {
            document.getElementById('search-input').value = '';
            document.getElementById('results-wrapper').classList.add('hidden');
            document.getElementById('results-container').innerHTML = '';
        }