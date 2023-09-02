    // ボタン要素を取得
    const buttons = document.querySelectorAll('button');

    // ボタンがクリックされたときの処理を設定
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.innerText; // ボタンのテキストを取得
            console.log(`ボタンのテキストは: ${buttonText}`);
            // ここで buttonText を使用して処理を行う
        });
    });