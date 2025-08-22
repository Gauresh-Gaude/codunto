  document.addEventListener('DOMContentLoaded', () => {
            const themeToggleBtn = document.getElementById('theme-toggle');
            const body = document.body;
            
            // Check for saved theme in localStorage or system preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                body.classList.add('dark');
            } else {
                body.classList.remove('dark');
            }

            themeToggleBtn.addEventListener('click', () => {
                body.classList.toggle('dark');
                if (body.classList.contains('dark')) {
                    localStorage.setItem('theme', 'dark');
                } else {
                    localStorage.setItem('theme', 'light');
                }
            });
        });