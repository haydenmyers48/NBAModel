//https://www.teamrankings.com/nba/trends/ats_trends/
const jsdom = require("jsdom");
const request = require('request');
var http = require('http');
var fs = require('fs');
const { runInContext } = require("vm");
const { resolve } = require("path");

const PORT=8080; 

let teams = [
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Hawks",
        "name": "Atlanta Hawks"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Celtics",
        "name": "Boston Celtics"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Nets",
        "name": "Brooklyn Nets"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Hornets",
        "name": "Charlotte Hornets"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Bulls",
        "name": "Chicago Bulls"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Cavs",
        "name": "Cleveland Cavaliers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Mavs",
        "name": "Dallas Mavericks"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Nuggets",
        "name": "Denver Nuggets"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Pistons",
        "name": "Detroit Pistons"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Warriors",
        "name": "Golden State Warriors"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Rockets",
        "name": "Houston Rockets"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Pacers",
        "name": "Indiana Pacers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Clippers",
        "name": "Los Angeles Clippers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Lakers",
        "name": "Los Angeles Lakers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Grizzlies",
        "name": "Memphis Grizzlies"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Heat",
        "name": "Miami Heat"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Bucks",
        "name": "Milwaukee Bucks"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Twolves",
        "name": "Minnesota Timberwolves"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Pelicans",
        "name": "New Orleans Pelicans"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Knicks",
        "name": "New York Knicks"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "OKC",
        "name": "Oklahoma City Thunder"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Magic",
        "name": "Orlando Magic"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "6ers",
        "name": "Philadelphia 76ers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Suns",
        "name": "Phoenix Suns"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Blazers",
        "name": "Portland Trail Blazers"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Kings",
        "name": "Sacramento Kings"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Spurs",
        "name": "San Antonio Spurs"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Raptors",
        "name": "Toronto Raptors"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Jazz",
        "name": "Utah Jazz"
    },
    {
        "games": 0,
        "score": 0,
        "weightedScore": 0,
        "mascot": "Wizards",
        "name": "Washington Wizards"
    }
];
var today = 0;

function findAwayTeam(dom, i)
{
    return teams.find(obj => {
        return obj.name === dom.window.document.querySelector('#schedule').rows[i].cells[2].textContent;
    })
}
function findHomeTeam(dom, i)
{
    return teams.find(obj => {
        return obj.name === dom.window.document.querySelector('#schedule').rows[i].cells[4].textContent;
    })
}
function october()
{
    return new Promise((resolve, reject) => {
        request('https://www.basketball-reference.com/leagues/NBA_2022_games-october.html', function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log("october", dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), "October", "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;
            resolve();
        })
    });
}
function november()
{
    return new Promise((resolve, reject) => {
        request('https://www.basketball-reference.com/leagues/NBA_2022_games-november.html', function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log("november", dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), "November", "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;
            resolve();
        })
    });
}
function december()
{
    return new Promise((resolve, reject) => {
        request('https://www.basketball-reference.com/leagues/NBA_2022_games-december.html', function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log("december", dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), "December", "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;
            resolve();
        })
    });
}
function january()
{
    return new Promise((resolve, reject) => {
        request('https://www.basketball-reference.com/leagues/NBA_2022_games-january.html', function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log("january", dom.window.document.querySelector('#schedule').rows.length);
            console.log(dom.window.document.querySelector('#schedule').rows[0]);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), "January", "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;
            resolve();
        });
    });
}
function february()
{
    return new Promise((resolve, reject) => {
        request('https://www.basketball-reference.com/leagues/NBA_2022_games-february.html', function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log("february", dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), "February", "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;

            resolve();
        });
    });
}
function march()
{
    return new Promise((resolve, reject) => {
        request('https://www.basketball-reference.com/leagues/NBA_2022_games-march.html', function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log("march", dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), "March", "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;
            resolve();
        })
    });
}
function april()
{
    return new Promise((resolve, reject) => {
        request('https://www.basketball-reference.com/leagues/NBA_2022_games-april.html', function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log("april", dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), "April", "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;
            resolve();
        });
    });
}

function may()
{
    return new Promise((resolve, reject) => {
        request('https://www.basketball-reference.com/leagues/NBA_2022_games-may.html', function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log("may", dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), "May", "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;
            resolve();
        });
    });
}

function june()
{
    return new Promise((resolve, reject) => {
        request('https://www.basketball-reference.com/leagues/NBA_2022_games-june.html', function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log("june", dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), "June", "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;
            resolve();
        });
    });
}

/*function parse(month)
{
    var url = 'https://www.basketball-reference.com/leagues/NBA_2022_games-'+month+'.html';
    return new Promise((resolve, reject) => {
        request(url, function (
            error,
            response,
            body
        ){
            console.error('error:', error)
            const dom = new jsdom.JSDOM(body);
            console.log(month, dom.window.document.querySelector('#schedule').rows.length);
            for(var i=1; i<dom.window.document.querySelector('#schedule').rows.length; i++)
            {
                console.log(i);
                if(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent != "")
                {
                    findAwayTeam(dom, i).games += 1;
                    findHomeTeam(dom, i).games += 1;
                    findAwayTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent));
                    findHomeTeam(dom, i).score += (parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent));
                    findAwayTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) + (findHomeTeam(dom, i).score - findAwayTeam(dom, i).score))/(findHomeTeam(dom, i).games + findAwayTeam(dom, i).games)/2);
                    findHomeTeam(dom, i).weightedScore += ((parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[5].textContent) - parseInt(dom.window.document.querySelector('#schedule').rows[i].cells[3].textContent) + (findAwayTeam(dom, i).score - findHomeTeam(dom, i).score))/(findAwayTeam(dom, i).games + findHomeTeam(dom, i).games)/2);
                }
                else if(today == 0)
                {
                    today = dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent;
                    
                }
                if(i == dom.window.document.querySelector('#schedule').rows.length - 1)
                {
                    for(var x=0; x<30; x++)
                    {
                        console.log(teams[x].name, "score: ", (teams[x].score/teams[x].games), month, "Weighted Score:", (teams[x].weightedScore/teams[x].games) + (teams[x].score/teams[x].games));
                    }
                    console.log(dom.window.document.querySelector('#schedule').rows[i].cells[0].textContent);
                }
            }
            today = 0;
        });

        resolve();
    });
}*/

async function run() {
    //await october();
    //await november();
    //await december();
    //await january();
	//await february();
    //await march();
    await april();
    await may();
    await june();

    var index = 0;
    var team1 = "";
    var spread = "";
    var team2 = "";
    var output = "";

    fs.readFile('./input.txt', 'utf8' , (err, data) => {
        if (err) 
        {
            console.error(err);
            return;
        }
        for(var i = 0; i < data.length; i++)
        {
            if(data[i] == "\n")
            {
                team1 = teams.find(obj => {
                    return obj.mascot === team1;
                });
                team2 = teams.find(obj => {
                    return obj.mascot === team2;
                });
                if((team1.score/team1.games + Number(spread) - team2.score/team2.games) >= 5)
                {
                    output += "Regular: "+team1.mascot+" "+spread+" by "+(team1.score/team1.games + Number(spread) - team2.score/team2.games)+"\n";
                }
                else if((team1.score/team1.games + Number(spread) - team2.score/team2.games) <= -5)
                {
                    output += "Regular: "+team2.mascot+" "+(Number(spread)-(Number(spread)*2))+" by "+(team1.score/team1.games + Number(spread) - team2.score/team2.games)+"\n";
                }
                if((team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games) >= 5)
                {
                    output += "Weighted: "+team1.mascot+" "+spread+" by "+(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)+"\n";
                }
                else if((team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games) <= -5)
                {
                    output += "Weighted: "+team2.mascot+" "+(Number(spread)-(Number(spread)*2))+" by "+(team1.weightedScore/team1.games + team1.score/team1.games + Number(spread) - team2.weightedScore/team2.games - team2.score/team2.games)+"\n";
                }
                index = 0;
                team1 = "";
                spread = "";
                team2 = "";
            }
            else if(data[i] == " ")
            {
                index++;
            }
            /*else if(data[i] == "+")
            {
                
            }*/
            else if(index == 0)
            {
                team1 += data[i];
            }
            else if(index == 1)
            {
                spread += data[i];
            }
            else if(index == 2)
            {
                team2 += data[i];
            }
        }
        if(output == "")
        {
            output = "No picks :(\n";
        }
        fs.writeFile('./output.txt', output, err => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });
};

run();