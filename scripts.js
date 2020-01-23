document.addEventListener('DOMContentLoaded', () => {
    let i = atob("MmE1ODBlYmQ2YjA2NGQ2NmEzYjM4MzNhMGI5Y2FlNjE=");
    let s = atob("MzE3ZGE1NTEzNzkxNGFmYTg5MThiYzQzZDQyODY2YWM=");

    function fetchData() {
        fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                'grant_type': 'refresh_token',
                'refresh_token': 'AQBPUXx0YJGoVwO2Lt5n8KXoMhlwqjyibfqk5uPuiVW9ES4Lp12UzTQ5fLR2eY9KhipchLwccchBoM0mkpmOI8Al65D_PXb-Xf67KKRsjpp1URVTqSZQ9H8nZRhE9B3SSPU',
                'client_id': i,
                'client_secret': s
            })
        })
            .then(response => response.json())
            .then(data => fetch('https://api.spotify.com/v1/me/player/recently-played?limit=1', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${data.access_token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => manipulateDom(data)))
    }

    function manipulateDom(data) {
        let artist = data.items[0].track.artists[0].name;
        let songName = data.items[0].track.name;

        const anchor = document.querySelector('#spotify-song');
        const p = document.createElement('p');
        p.className = 'spotify';
        p.innerHTML = `I last listened to ${songName} by ${artist} on Spotify. 🎶`

        anchor.append(p);
    }

    fetchData();
});