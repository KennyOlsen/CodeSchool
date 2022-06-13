var app = new Vue({
    el: '#app',
    data: {
        prompt: 'Ask a question',
        message: '',
        messageBank: [
            'Yes',
            'No',
            'Maybe',
            'Ask Again Tomorrow',
            'Probably',
            'Probably not'
        ],      

        question: ''
    },
    methods: {
        askQuestion: function () {
            if (this.isValidQuestion()) {
                let nextIndex = Math.floor(Math.random() * this.messageBank.length);
                this.message = this.messageBank[nextIndex];
                this.prompt = 'Ask another question';
                this.question = '';
            } else {
                return
            }
        },

        isValidQuestion: function () {
            return this.question[this.question.length - 1] == '?';
        }
    }
})