const knex = require('knex')
const app = require('../src/app')

describe('Noteful Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the table', () => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY CASCADE'))

  afterEach('cleanup',() => db.raw('TRUNCATE noteful_folders, noteful_notes RESTART IDENTITY CASCADE'))

  context('Given there are folders in the database', () => {
    const testFolders = [
      {
        id: 1,
        date_published: '2029-01-22T16:28:32.615Z',
        folder_name: 'folder 1'
      },
      {
        id: 2,
        date_published: '2100-05-22T16:28:32.615Z',
        folder_name: 'folder 2'
      },
      {
        id: 3,
        date_published: '1919-12-22T16:28:32.615Z',
        folder_name: 'folder 3'
      },
      {
        id: 4,
        date_published: '1919-12-22T16:28:32.615Z',
        folder_name: 'folder 4'
      },
    ];

    beforeEach('insert folder', () => {
      return db
        .into('noteful_folders')
        .insert(testFolders)
    })

    it('GET /folders responds with 200 and all of the folders', () => {
      return supertest(app)
        .get('/folders')
        .expect(200, testFolders)
    })

    it('GET /folders/:folder_id responds with 200 and the specified folder', () => {
      const folderId = 2
      const expectedFolder = testFolders[folderId - 1]
      return supertest(app)
        .get(`/folders/${folderId}`)
        .expect(200, expectedFolder)
    })
  })
})