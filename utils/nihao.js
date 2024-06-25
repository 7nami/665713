window.onload = function() {
    const texts = ["你好", "熊猫", "花花", "再见"];
    let index = 0;

    function changeText() {
        index = (index + 1) % texts.length;
        document.getElementById('text-container').innerText = texts[index];
        console.log('完成changeText了');
    }

    setInterval(changeText, 3000);
};
