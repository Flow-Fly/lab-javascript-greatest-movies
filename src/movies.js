
// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(data) {
  let explored = []
  return data.map(movie => {
    if (movie.director && !explored.includes(movie.director)) {
      explored.push(movie.director)
      return movie.director
    }
  })
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(data) {
  return data.filter(movie => {
    return (movie.director === 'Steven Spielberg' && movie.genre.includes('Drama'))
  }).length
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(data) {
  if (!data.length) return 0

  return (data.reduce((acc, val) => {
    if (typeof val.score === 'number') {
      return acc + val.score
    } else {
      return acc
    }
  },0) / data.length).toFixed(2) * 1
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(data) {
  if (!data.length) return 0
  
  let drama = data.filter(movie => {
    return movie.genre.includes('Drama')
  })
  if (!drama.length) return 0

  return (drama.reduce((acc,val) => {
    if (typeof val.score === 'number') {
      return acc + val.score
    } else {
      return acc
    }
  },0) / drama.length).toFixed(2) * 1
}



// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(data) {
  orderedByYear = [...data]

  orderedByYear.sort((a,b) => {
    if (a.year === b.year) {
      //Alphabetical if years match
      return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1 
    } else {
      return a.year < b.year ? -1 : 1
    }
  })
  return orderedByYear
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(data) {

  let max = 20;
  if (data.length < 20) {
    max = data.length
  }

  let alphabeticallyOrdered = [...data]
  alphabeticallyOrdered.sort((a,b) => {
    if(typeof a.title === 'string' && typeof b.title === 'string')
    return a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1
  })
  alphabeticallyOrdered = alphabeticallyOrdered.map(movie => movie.title)
  //return 20 or max amount of titles
  return alphabeticallyOrdered.splice(0, max)
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(data) {
  
  treatedData = JSON.parse(JSON.stringify(data))
  treatedData = treatedData.map(movie => {

    //Casting to string to prevent empty field(s) from preventin .match function to work
    parseToMinutes = String(movie.duration)
    //match all digits
    parseToMinutes = parseToMinutes.match(/\d/g)
    // for this logic to work, movies need to be atleast 1 hour long
    let hour = parseToMinutes[0] * 60
    
    if (parseToMinutes.length === 1) {
      movie.duration = hour
      return movie
    }
    else if (parseToMinutes.length % 2 === 0) {
      //I'm a real number thanks to ParseInt <3
      movie.duration = hour + parseInt(parseToMinutes[1])
    } 
    else {
      // Casting like a Wizzard, transforming string to number
      let minutes = parseToMinutes[1] * 10 + parseToMinutes[2] * 1
      movie.duration = hour + minutes
    }
    return movie
  })
  return treatedData
}


// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(data) {
  if (!data.length) return null

  copiedData = JSON.parse(JSON.stringify(data))
  yearsToExplore = []
  //Appending all the uniques year to explore
  copiedData.forEach(movie => {
    if (!yearsToExplore.includes(movie.year)) {
      yearsToExplore.push(movie.year)
    }
  })

  let best = {
    year: -1,
    avg: -1
  }
  yearsToExplore.forEach(year => {
    let movies = copiedData.filter(movie => {
      return movie.year === year
    })
    //Getting the average of this year with a 2 decimal precision
    let yearAvg = (movies.reduce((acc, val) => acc + val.score, 0) / movies.length).toFixed(2) * 1
    
    //If the current average match the best, get the earliest year to achieve this average
    if(yearAvg === best.avg) {
      best.year = best.year < year ? best.year : year
    }
    //Get that beast year in! 
    if (yearAvg > best.avg) {
      best.avg = yearAvg
      best.year = year
    }
  })
  return `The best year was ${best.year} with an average score of ${best.avg}`
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg,
  };
}
