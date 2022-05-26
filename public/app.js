let gameArr, gameCategoryArr, formerCategory;
let cur = 0;
let limit = 1500;

// Initialization
$('document').ready(async()=>{
    // Variables
    formerCategory = document.querySelectorAll('.category')[0];
    formerDevice = document.querySelector('#pc');
    await showGameCategory('MMO');
    let gameArr = await getData('gameList', 'pc');
    console.log(gameArr);

    // Event Listeners
    $('form').submit(async (e)=>{
        e.preventDefault();
        searchGameByName($(e.target.children[0]).val(), gameArr);
    })

    $('#feelingLuckyBtn').click(()=>{
        searchGameByKeyword(Math.floor(Math.random()*gameArr.length));
    })

    $('.category').click((e)=>{
        formerCategory.classList.remove('text-yellow-300');
        e.target.classList.add('text-yellow-300');
        formerCategory = e.target;
        
        showGameCategory(e.target.textContent);
    })

    window.onscroll = function() {showMore()};

})

// Main functions
async function searchGameByKeyword(gameId){
    let gameInfo = await getData('gameById', gameId);

    // Dom manipulation
    $('.searchedGames').html(
        `<div class="gameCardLg flex flex-col md:flex-row items-center justify-around px-6">
        <img src="${gameInfo.thumbnail}" alt="" class="rounded-lg drop-shadow w-1/3 md:w-1/2 my-6">
        <div class="showHideTxts flex flex-col items-start px-6 gap-2">
            <div class="">
                <p class="gameTitle font-bold text-white text-3xl">
                    ${gameInfo.title}
                </p>
                <div class="flex mt-2 gap-6">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:stroke-yellow-300 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2" onclick="showHide(1)">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:stroke-yellow-300 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2" onclick="showHide(2)">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span class="flex">
                        <form action="${gameInfo.game_url}">
                        <button>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer animate-pulse"  fill="none" viewBox="0 0 24 24" stroke="rgb(253 224 71)" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        </button>
                        
                        </form>
                        
                    </span>
                </div>
            </div>
            <div class="overflow-y-scroll h-60 text-white leading-tight mt-2 backdrop-blur bg-gray-500 p-2 rounded gameDes">
                <p>
                ${gameInfo.description}
                </p>
            </div>
            <div class="overflow-auto h-1/3 leading-tight mt-2 backdrop-blur rounded bg-gray-500 hidden gameSys">
                <table class="text-white">
                <tr>
                    <td>Graphics:</td>
                    <td>${gameInfo.minimum_system_requirements.graphics}</td>
                </tr>
                <tr>
                    <td>Memory:</td>
                    <td>${gameInfo.minimum_system_requirements.memory  || ''}</td>
                </tr>
                <tr>
                    <td>OS:</td>
                    <td>${gameInfo.minimum_system_requirements.os  || ''}</td>
                </tr>
                <tr>
                    <td>Processor:</td>
                    <td>${gameInfo.minimum_system_requirements.processor  || ''}</td>
                </tr>
                <tr>
                    <td>Storage:</td>
                    <td>${gameInfo.minimum_system_requirements.storage  || ''}</td>
                </tr>
                </table>
            </div>
        </div>
    </div>`
    );


    
    console.log(gameInfo);
}

function showHide(objNum){
    document.querySelector('.showHideTxts').children[(Number)(objNum)].classList.remove('hidden');
    document.querySelector('.showHideTxts').children[3-(Number)(objNum)].classList.add('hidden');
}


async function showGameCategory(category){
    gameCategoryArr = await getData('gameByTag', category);
    
    // Dom manipulation
    $('.games').html('');
    cur = 0;
    showGames(0,10);
    
}

function showGames(startNum,endNum){
    for(let i = startNum; i < endNum; i++){
        $('.games').append(
            `<div class="gameCard px-6">
                <img src="${gameCategoryArr[i].thumbnail}" alt="" class="rounded-lg drop-shadow">
                <div class="flex justify-between items-center  gap-6">
                    <p class="gameTitle font-bold text-white text-3xl">
                        ${gameCategoryArr[i].title}
                    </p>
                    <div class="flex items-center justify-center gap-6">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 hover:stroke-yellow-300 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2" onclick="viewDetails(${gameCategoryArr[i].id})">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span class="flex items-center justify-center m-0 p-0">
                            <form action="${gameCategoryArr[i].game_url}" class="flex items-center justify-center p-0 m-0">
                            <button>
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 cursor-pointer animate-pulse"  fill="none" viewBox="0 0 24 24" stroke="rgb(253 224 71)" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            </button>
                            </form>
                        </span>
                    </div>
                </div>
                <div class="overflow-auto h-20 text-gray-200 leading-tight mt-2">
                    <p class="gameDes">
                    ${gameCategoryArr[i].short_description}
                    </p>
                </div>
            </div>`
        )
    }
    cur+=10;
}

function viewDetails (id) {
    scrollToTop();
    searchGameByKeyword(id);
}

function scrollToTop(){
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function showMore(){
    if (document.body.scrollTop > limit || document.documentElement.scrollTop > limit || document.body.scrollTop === document.body.scrollHeight || document.documentElement.scrollTop === document.documentElement.scrollHeight ) {
        limit+=1500;
        showGames(cur, cur+10);
    }
}

// Helper functions
async function searchGameByName(gameName, gameArr){

    console.log(gameName, gameArr);

    await gameArr.forEach(game => {
        // console.log(game.title);
        if(game.title == gameName) {
            searchGameByKeyword(game.id);
            return;
            }
})
}

//  Api functions
function getData (req, param){
        let result;
        switch (req){
            case 'gameList':
                result = fetch(`https://www.freetogame.com/api/games?platform=${param}`);
                break;
            case 'gameDetails':
                result = fetch(`https://www.freetogame.com/api/games?platform=${param}`);
                break;
            case 'gameByTag':
                result = fetch(` https://www.freetogame.com/api/games?category=${param}`);
                break;
            case 'gameById':
                result = fetch(`https://www.freetogame.com/api/game?id=${param}`);
                break;
            case 'gameSorted':
                result = fetch(`https://www.freetogame.com/api/games?sort-by=${param}`);
                break;
        }
        return result.then(res=>{
            //console.log(res.json());
            return res.json()});
    }

async function playingAround(req,param){
    let data = await getData(req,param);
    console.log(data);
    return data;
}

/*
    - To apply TailwindCSS, async-await and fetch API, this mini-project (v0.0) is coded from May 25 to May 26 2022. 
*/
