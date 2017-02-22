lient Application to Web Server Interface

All objects will be represented in JSON format unless otherwise noted.
`Optional<>` implies that the field is not guaranteed to be included in the object returned from the web server.
`Date` will be represented in JSON as the number of milliseconds since 1 January 1970 00:00:00 UTC.
REST API calls are all to be executed in the context of the currently authenticated user.
User authentication will be handled by server and a cookied code.

## Authentication

All requests except `/user/login` will have an authentication token in the header to authenticate the user.

## User

The `User` object represents a user of the playlist system.

### User Object

|Name               |Type                     |Description                                                             |
|-------------------|-------------------------|------------------------------------------------------------------------|
|id                 |`int`                   |Unique identifier for a user.    |
|name               |`String`   |Display name for the user.         |
|password               |`Hash`   |Password for the user.         |
|email  |`String`       |Email for the user.|

### User REST API

|HTTP Method|URL                    |Input      |Output         |Description                                           |
|-----------|-----------------------|-----------|---------------|------------------------------------------------------|
| POST       |/user/login| `User` |`Token`  | Login a user and get an access token. |
| GET       |/user/user-info             |           |`User`  |Get the logged in users information.            |
| GET       |/user/{userId}    |           |`User`      |Get the user with the provided user ID.               |
| GET       |/user?name=value&email=value             |           |`List<User>`  |Search for a user by name and/or email            |
| GET       |/user |           |`List<User>`  |A listing of all users            |
| PUT       |/user/{userId}    |`User`  |`User`      |Updates a user.            |
| POST       |/user  |`User`  |`User`  |Registers a user |





## Playlist

The `Playlist` object represents the metadata about a collection of songs created by a particular user.

### Playlist Object

|Name           |Type       |Description                                                                               |
|---------------|-----------|------------------------------------------------------------------------------------------|
|id             |`int`     |Unique identifier for a playlist.                                                            |
|name           |`String`     |Display name of the playlist.                             |
|author         |`User<id>`    |Name of user who created it.  |

### Playlist REST API

|HTTP Method|URL                    |Input      |Output     |Description                                               |
|-----------|-----------------------|-----------|-----------|----------------------------------------------------------|
|GET        |/playlist            |           |`List<Playlist>`|Listing of all playlists available to the user.    |
|GET        |/playlist/{playlistId}  |           |`Playlist`      |Get the Playlist represented by the provided playlistId.        |
|POST       |/playlist/           |`Playlist`      |`Playlist`      |Create a new Playlist.                                       |
|PATCH        |/playlist/{playlistId} | `Playlist` |`Playlist`      |Update an existing Playlist.
|PUT    |/playlist/{playlistId}   | `Playlist`    | `Playlist`    | Update an existing playlist






## Playlist Songs

The `PlaylistSongs` object represents the metadata about a collection of songs in a particular playlist.

### Playlist Songs Object

|Name           |Type           |Description                                                                           |
|---------------|---------------|--------------------------------------------------------------------------------------|
|id        |`int`|Unique identifier of a song in the playlist.                                                 |
|votes        |`int`|Number of votes from users                                                 |
|order        |`int`|The position of the song in the playlist based on the vote.                                                 |
|songId | `Song<id>`| ID of the song in the songs listing |

### Playlist Songs REST API

|HTTP Method|URL                                   |Input  |Output      |Description                                   |
|-----------|--------------------------------------|-------|------------|----------------------------------------------|
|GET        |/playlist/{id}/song        |       |`List<PlaylistSongs>`|List all the songs in a playlist.|
|GET     |/playlist/{id}/song/{id}|       |`PlaylistSong`|Details of a given song on a playlist.|
|POST|/playlist/{id}/song      | `PlaylistSong`     |`PlaylistSong`|Adds a song to the playlist|
|DELETE        |/playlist/{id}/song/{id}         |    `PlaylistSong`   ||Removes a song from the playlist.|
|PATCH        |/playlist/{id}/song/{id} | `PlaylistSong`|`PlaylistSong`|Updates a song on a playlist|
|PUT        |/playlist/{id}/song/{id}         | `PlaylistSong`      |`PlaylistSong`|Updates a song on a playlist|



## Playlist Sharing

The `PlaylistShare` object represents a request from a user to add another user to a particular playlist.  This is a subset of a playlist.

### PlaylistShare Object

|Name      |Type             |Description                                                                              |
|----------|-----------------|-----------------------------------------------------------------------------------------|
|id        |`String`           |Unique identifier for a PlaylistShare.                                                |
|userId     |`User<id>`            |The id of the user to add.                                                           |
|invitedBy |`User<id>`        |Person that sent the invitation.                                                         |
|access |`ENUM`        | Access level (vote, addSongs, admin)                        |
|inviteTime|`Date`          |Time the invitation was created.                                                         |
|accepted  |`Optional<Boolean>`|Response to the invitation. True if accepted, false if rejected, absent if outstanding.  |

### PlaylistShare REST API

|HTTP Method|URL                                  |Input          |Output               |Description                   |
|-----------|-------------------------------------|---------------|---------------------|------------------------------|
|GET        |/playlist/{playlistId}/share               |               |`List<PlaylistShare>`|Invitations for current playlist. |
|GET        |/playlist/{playlistId}/share/{id} |               |`PlaylistShare`      |Get invitation by provided ID.|
|POST       |/playlist/{playlistId}/share               |`PlaylistShare`|`PlaylistShare`      |Create a new playlist invitation.|
|PUT/PATCH        |/playlist/{playlistId}/share/{id}|`PlaylistShare`|`PlaylistShare`      |Update the invitation/access. |
|DELETE        |/playlist/{playlistId}/share/{id}||      |Delete an invitation/share access. |





## Song Listing

The `Song` object represents a song which could be in a playlist.

### Song Object

|Name      |Type             |Description                                                                              |
|----------|-----------------|-----------------------------------------------------------------------------------------|
|id      |`int`           |Song ID.                                                 |
|title  |`String`         |The song title.                                                   |
|albumTitle  |`String`         |The songs album title.  |
|artist  |`String`         |The song's artist.  |
|genre  |`String`         |The song's genre.  |
|musicUrl   |`Uri`           | The url for an audio file of the song to play.              |
|lengthSeconds | `int` | The length is seconds|

### Song REST API

|HTTP Method|URL           |Input |Output        |Description                                                          |
|-----------|--------------|------|--------------|---------------------------------------------------------------------|
| GET       |/song|      |`List<Song>`|Get List of all Songs.|
| GET       |/song| `Song` |`List<Song>`| Filter by any combination of `title`, `albumTitle`, `artist`, and `genre` query params.|
| GET       |/song/{id}|      |`Song`|Get the details of a specific song.|
