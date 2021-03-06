const mysql = require('mysql');
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'oneTeam'
});

//---------------------------------------------------------USER QUERIES
//-------------------------------------------- GET REQUESTS
const getUser = (user, callback) => {
  let query = `SELECT * FROM users WHERE name = "${user}"`;

  connection.query(query, (err, results) => {
    (err) ?
      console.error(err) :
      callback(err, results);
  });
  } 
  
  const getUserId = (user, callback) => {
    let query = `SELECT id FROM users WHERE name = "${user}"`;

    connection.query(query, (err, results) => {
      (err) ?
        console.error(err) :
        callback(results);
    });
  } 

//-------------------------------------------- SET REQUESTS
const setUser = (user, callback) => {
  var query = `INSERT IGNORE INTO users (name, owner) VALUE (?, ?);`

  connection.query(query, [user.username, user.isOwner], (err, results) => {
    (err) ?
      console.error(err) :
      callback(err, results);
  })
}

//---------------------------------------------------------VIDEO QUERIES
//-------------------------------------------- GET REQUESTS
const getAllVideos = (callback) => {
  const query = 'SELECT * FROM videos';

  connection.query(query, (err, results) => {
    (err) ?
      console.log('Did not get videos from database', err) :
      callback(results);
  });
};

const getCurrentVideo = (videoId, callback) => {
  const query = `SELECT * FROM videos WHERE videoId='${videoId}'`;

  connection.query(query, (err, results) => {
    (err) ?
      console.log('err', err) :
      callback(results);
  })
}

const getOwnerVideos = (userId, callback) => {
  const query = `SELECT * FROM videos WHERE userId='${userId}'`;

  connection.query(query, (err, results) => {
    (err) ?
      console.log('Did not get videos from database', err) :
      callback(results);
  });
};


const getBuckets = function({videoId, duration}, callback) {
  let bucketFloors = []
  for (let i = 0; i < duration; i+=duration/10) {
    bucketFloors.push(Math.floor(i))
  }
  connection.query(`select TimeStampGroup,
  count(*) as total
  from (
    select case when timestamp between ${bucketFloors[0]} and ${bucketFloors[1]} then '${bucketFloors[0]}-${bucketFloors[1]}' 
      when timestamp between ${bucketFloors[1]} and ${bucketFloors[2]} then '${bucketFloors[1]}-${bucketFloors[2]}' 
      when timestamp between ${bucketFloors[2]} and ${bucketFloors[3]} then '${bucketFloors[2]}-${bucketFloors[3]}' 
      when timestamp between ${bucketFloors[3]} and ${bucketFloors[4]} then '${bucketFloors[3]}-${bucketFloors[4]}' 
      when timestamp between ${bucketFloors[4]} and ${bucketFloors[5]} then '${bucketFloors[4]}-${bucketFloors[5]}' 
      when timestamp between ${bucketFloors[5]} and ${bucketFloors[6]} then '${bucketFloors[5]}-${bucketFloors[6]}' 
      when timestamp between ${bucketFloors[6]} and ${bucketFloors[7]} then '${bucketFloors[6]}-${bucketFloors[7]}'
      when timestamp between ${bucketFloors[7]} and ${bucketFloors[8]} then '${bucketFloors[7]}-${bucketFloors[8]}'
      when timestamp between ${bucketFloors[8]} and ${bucketFloors[9]} then '${bucketFloors[8]}-${bucketFloors[9]}'
      else '${bucketFloors[9]}+' end as TimeStampGroup
      from timeStamps WHERE videoId = '${videoId}'
    ) t
    group by TimeStampGroup order by TimeStampGroup;`, 
    function(err, results, fields) {
      if(err) {
        console.error(err);
      } else {
        callback(results);
      }
    })
}


//-------------------------------------------- POST REQUESTS
const setVideo = (video, userId, duration, callback) => {
  const query = "INSERT IGNORE INTO videos (videoId, title, description, image, userId, duration) VALUES (?, ?, ?, ?, ?, ?);";
  const values = [video.id.videoId, video.snippet.title, video.snippet.description, video.snippet.thumbnails.default.url, userId, duration];

  connection.query(query, values, (err, result) => {
    (err) ?
      console.log('Video is not saved', err) :
      callback();
  })
}

//---------------------------------------------------------TIMESTAMP QUERIES
//-------------------------------------------- GET REQUESTS
const getTimestamp = (videoId, userId, callback) => {
  const query = `SELECT timestamp FROM timeStamps WHERE videoId = '${videoId}' AND userId = '${userId}' ORDER BY timestamp asc;`

  connection.query(query, (err, results, fields) => {
    (err) ?
      console.error(err) :
      callback(results);
  })
}
const getOwnerTimestamp = (videoId, callback) => {
  const query = `SELECT timestamp, userId FROM timeStamps WHERE videoId = '${videoId}' ORDER BY timestamp asc;`;

  connection.query(query, (err, results, fields) => {
    (err) ?
      console.error(err) :
      callback(results);
  })
}


//-------------------------------------------- POST REQUESTS
const setTimestamp = ({userId, videoId, timestamp}, callback) => {
  const query = `INSERT INTO timeStamps (userId, videoId, timeStamp) VALUES (${userId}, '${videoId}', ${timestamp});`;

  connection.query(query, (err, results, fields) => {
    (err) ?
      console.error(err) :
      callback(results);
  });
};

//-------------------------------------------- DELETE REQUESTS
const deleteTimestamp = ({userId, videoId, timestamp}, callback) => {
  const query = `DELETE FROM timeStamps WHERE userId = ${userId} AND videoId = '${videoId}' AND timeStamp = ${timestamp};`

  connection.query(query, (err, results, fields) => {
    (err) ?
      console.error(err) :
      callback(results);
  })
}
  
exports.getBuckets = getBuckets;
exports.getUser = getUser;
exports.setUser = setUser;
exports.setVideo = setVideo;
exports.setTimestamp = setTimestamp;
exports.getUserId = getUserId;
exports.getTimestamp = getTimestamp;
exports.getAllVideos = getAllVideos;
exports.getOwnerVideos = getOwnerVideos;
exports.getCurrentVideo = getCurrentVideo;
exports.getOwnerTimestamp = getOwnerTimestamp;
exports.deleteTimestamp = deleteTimestamp;
