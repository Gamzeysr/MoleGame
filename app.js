const startBtn = document.getElementById("start");
const scoreText = document.getElementById("score");
const Moles = document.querySelectorAll(".köstebek");

let öncekiKöstebek;
let süreDoldu = false;
let score = 0;
//*******FONKSİYONLAR  ******/


function rastgeleKöstebek()
// Burada köstebeklerin seçilme olaylarını ayarladık
{
    const sıra = Math.floor(Math.random() * Moles.length);
    //! Burada 0 ile 5 De dahil bir sayı olustuutuyorum. köstebekleriim 6 tane oldugu için bunların arasından rastgele bir köstebek secicem
    const secilenKöstebek = Moles[sıra];
    if (öncekiKöstebek === secilenKöstebek) {
        return rastgeleKöstebek();
    } else {
        öncekiKöstebek = secilenKöstebek;
    }
    return secilenKöstebek;
}

function rastgeleSüre(min, max)
// burada süre akışını ayarladık 
{
    const süre = Math.round(Math.random() * (max - min)) + min;
    return süre;
}

function yukarı() {
    const köstebek = rastgeleKöstebek();
    const süre = rastgeleSüre(750, 1250);
    köstebek.classList.add("secilen");
    setTimeout(() => {
        köstebek.classList.remove("secilen");
        if (!süreDoldu) {
            yukarı();
        }


    }, süre);
}


function startGame() {
    yukarı();
    setTimeout(() => {
        süreDoldu = true;
    }, 15000);
}

function peep(e) {
    if (e.target.classList.contains("secilen")) {
        score++
        e.target.classList.remove("secilen");
    }
    scoreText.textContent = score;
}

startBtn.addEventListener("click", () => {
    startGame();
});

Moles.forEach(köstebek => {
    köstebek.addEventListener("click", peep);
})