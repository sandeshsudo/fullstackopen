const listHelper = require('../utils/list_helper')

describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ]
  
    test('single blog', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      expect(result).toBe(5)
    })
  })

  describe('favorite blog', () => {
    const listWithBlogs = [
        {
          _id: '5a422aa71b54a676234d17f8',
          title: 'Go To Statement Considered Harmful',
          author: 'Edsger W. Dijkstra',
          url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          likes: 5,
          __v: 0
        },
        {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Seven wonders of the world!',
            author: '7 Killer',
            url: 'http://www.worldheritage.com',
            likes: 7,
            __v: 0
          },
      ]

    const resultCanBe = {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Seven wonders of the world!',
        author: '7 Killer',
        url: 'http://www.worldheritage.com',
        likes: 7,
        __v: 0
      }

      test('fav blog', () => {
        const result = listHelper.favoriteBlog(listWithBlogs)
        expect(result).toEqual(resultCanBe)
      })
  })