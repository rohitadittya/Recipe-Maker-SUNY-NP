export const showToast = (content, isError=false) => {
    const body = document.body;
    const toastContainer = document.createElement('div');
    toastContainer.id = 'toastContainer';
    toastContainer.className = 'toast_container';

    const toast = document.createElement('div');
    if (isError) {
        toast.classList.add('toast', 'err_toast');
        toast.innerText = content?.message ? content.message : 'Some unknown error occured!';
    }
    else {
        toast.classList.add('toast', 'success_toast');
        toast.innerText = content?.message ? content.message : 'Success!';
    }

    toastContainer.appendChild(toast);
    body.appendChild(toastContainer);

    setTimeout(() => {
        toastContainer.remove();
        toast.remove();
    }, 3000);
};