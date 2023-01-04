const game = {
    indexTheme: Math.floor(Math.random() * data.length),
    finishCard: 0,
    render: function() {
        const root = document.querySelector('.root')
        const ranNums = this.ranNums(1, 24)
        if (data[this.indexTheme].ratio)
            root.classList.add('ratio-3x4')
        for (let i = 0; i < 24; i++) {
            let src = ranNums[i] % 12 ? ranNums[i] % 12 : 12;
            root.innerHTML += `
                <div class="card">
                <div class="image-item image-backside">
                <img src="./images/${data[this.indexTheme].name}/a (${src}).jpg" alt="">
                </div>
                <div class="image-item image-front">
                <img src="./images/question-mark.jpg" alt="">
                </div>
                </div>
                `
        }
    },
    handle: function() {
        that = this;
        let clickBlocked = false
        let indexFlip = 0;
        let oldImage = { index: 0, src: '' };
        const cards = document.querySelectorAll('.card:not(.active)')
        const images = document.querySelectorAll('.image-backside img')
        cards.forEach(function(card, i) {
            card.onclick = () => {
                openCard(card, i)
            }
        })

        function openCard(card, i) {
            if (clickBlocked) return;

            if (!card.classList.value.includes('active')) {
                indexFlip++;
                card.classList.add('active')
                if (indexFlip === 1) {
                    oldImage.index = i;
                    oldImage.src = images[i].src;

                }
                if (indexFlip === 2) {
                    if (images[i].src === oldImage.src && i !== oldImage.index) {
                        that.finishCard++
                            if (that.finishCard === 12) {
                                that.play()
                            }
                        setTimeout(function() {
                            card.classList.add('lock')
                            cards[oldImage.index].classList.add('lock')
                            indexFlip = 0;
                        }, 500)
                    } else {
                        closeCard()
                        clickBlocked = true;
                        setTimeout(function() {
                            clickBlocked = false;
                        }, 1000)
                    }
                }

            }
        }

        function closeCard() {
            setTimeout(function() {
                cards.forEach(function(card) {
                    card.classList.remove('active')
                })
                indexFlip = 0;
            }, 700)
        }
    },
    ranNums: function(start, end) {
        let nums = [];
        let ranNums = [];
        for (let i = start; i <= end; i++) {
            nums.push(i)
        }

        while (end--) {
            start = Math.floor(Math.random() * (end + 1));
            ranNums.push(nums[start]);
            nums.splice(start, 1);
        }
        return ranNums;
    },
    removeMenu: function() {
        const menu = document.querySelector('.menu')
        if (menu) {
            menu.remove()
        }
    },
    music: function() {
        const audio = document.querySelector('audio')
        audio.play()

    },
    play: function() {
        this.removeMenu()
        this.music()
        this.render();
        this.handle()
    }
}
