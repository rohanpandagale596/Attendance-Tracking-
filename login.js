document.addEventListener('DOMContentLoaded', function () {

    const loginForm = document.getElementById('loginForm');
    const forgotView = document.getElementById('forgotView');
    const showForgot = document.getElementById('showForgot');
    const backToLogin = document.getElementById('backToLogin');

    const tabButtons = document.querySelectorAll('.tab-btn');
    const recoveryLabel = document.getElementById('recoveryLabel');
    const recoveryInput = document.getElementById('recoveryInput');
    const recoveryIcon = document.getElementById('recoveryIcon');
    const recoveryBtnText = document.getElementById('recoveryBtnText');
    const forgotForm = document.getElementById('forgotForm');
    const recoverySuccess = document.getElementById('recoverySuccess');
    const recoverySuccessText = document.getElementById('recoverySuccessText');

    // ---- Password visibility toggle ----
    document.querySelectorAll('.toggle-visibility').forEach(function (icon) {
        icon.addEventListener('click', function () {
            const target = document.getElementById(icon.dataset.target);
            const isHidden = target.type === 'password';
            target.type = isHidden ? 'text' : 'password';
            icon.classList.toggle('fa-eye', !isHidden);
            icon.classList.toggle('fa-eye-slash', isHidden);
        });
    });

    // ---- Switch between login and forgot-password views ----
    function showView(view) {
        [loginForm, forgotView].forEach(function (el) {
            el.classList.remove('active');
        });
        view.classList.add('active');
    }

    showForgot.addEventListener('click', function (e) {
        e.preventDefault();
        resetForgotState();
        showView(forgotView);
    });

    backToLogin.addEventListener('click', function () {
        showView(loginForm);
    });

    function resetForgotState() {
        forgotForm.classList.remove('hidden');
        recoverySuccess.classList.remove('visible');
        recoveryInput.value = '';
    }

    // ---- Email / Phone recovery tabs ----
    tabButtons.forEach(function (btn) {
        btn.addEventListener('click', function () {
            tabButtons.forEach(function (b) { b.classList.remove('active'); });
            btn.classList.add('active');

            const mode = btn.dataset.mode;

            if (mode === 'phone') {
                recoveryLabel.textContent = 'Registered Phone Number';
                recoveryInput.type = 'tel';
                recoveryInput.placeholder = 'e.g. 98765 43210';
                recoveryIcon.className = 'fa-solid fa-mobile-screen';
                recoveryBtnText.textContent = 'Send OTP';
            } else {
                recoveryLabel.textContent = 'Registered Email';
                recoveryInput.type = 'email';
                recoveryInput.placeholder = 'ajay.patil@college.edu';
                recoveryIcon.className = 'fa-regular fa-envelope';
                recoveryBtnText.textContent = 'Send Reset Link';
            }
        });
    });

    // ---- Mock submit handlers (replace with real API calls) ----
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();
        // TODO: POST credentials to the auth endpoint, e.g.
        // fetch('login.php', { method: 'POST', body: new FormData(loginForm) })
        alert('Login submitted (connect this to your auth backend).');
    });

    forgotForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const activeMode = document.querySelector('.tab-btn.active').dataset.mode;

        // TODO: replace with a real request, e.g.
        // fetch('send-reset.php', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({ mode: activeMode, value: recoveryInput.value })
        // });

        recoverySuccessText.textContent = activeMode === 'phone'
            ? 'OTP sent to your phone number.'
            : 'Reset link sent to your email.';

        forgotForm.classList.add('hidden');
        recoverySuccess.classList.add('visible');
    });

});
