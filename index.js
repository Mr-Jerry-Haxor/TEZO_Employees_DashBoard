function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const mainContainer = document.querySelector('.main-container');
    sidebar.classList.toggle('toggleopen');
    mainContainer.classList.toggle('sidebar-open');
}

function toggleSubmenu(submenuId) {
    const submenu = document.querySelector(`#${submenuId}`);
    submenu.classList.toggle('submenuopen');
}
