export const displayErrToast = (err) => {
    const body = document.body;
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast_container';

    const toast = document.createElement('div');
    toast.classList.add('toast', 'err_toast');
    toast.innerText = err?.message ? err.message : 'Some unknown error occured.';

    toastContainer.appendChild(toast);
    body.appendChild(toastContainer);

    setTimeout(() => {
        toastContainer.remove();
        toast.remove();
    }, 3000);
};