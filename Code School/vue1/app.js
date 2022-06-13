var app = new Vue({
    //Use object on element with #app
    el: "#app",
    //variables to store data about elements
    data: {
        message: 'Hello vue!',
        showText: true,
        globalColor: '#444',
        items: [
            {text: 'item A', color: '#1f2', show: true},
            {text: 'item B', color: '#500', show: true},
            {text: 'item C', color: '#5cf', show: true},
            {text: 'item D', color: '#0f0', show: true}
        ],
        strings: [
            'one',
            'two',
            'three'
        ]
    },
    //methods are functions to use on elements
    methods: {
        toggleTextandAddA_GLOBAL: function () {
            //this. refers to vues variables
            this.showText = !this.showText;
            this.message = this.message + 'a';
        },
        toggleTextandAddA: function (item) {
            // changes individual values
            item.show = !item.show;
            item.text = item.text + 'a';
        },
        toggleBackgroundColor: function (item) {
            if (item.color != this.globalColor) {
                item.previousColor = item.color;
                item.color = this.globalColor;
            } else {
                item.color = item.previousColor;
            }

            this.globalColor = '#444';
        }
    }
})

