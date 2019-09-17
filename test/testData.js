const fs = require('fs')
const path = require('path')

const createEnteredSkillsEvent = {
  'Records': [
    {
      'eventID': '580f6ffad604716b48e952b84da9df14',
      'eventName': 'INSERT',
      'eventVersion': '1.1',
      'eventSource': 'aws:dynamodb',
      'awsRegion': 'us-east-1',
      'dynamodb': {
        'ApproximateCreationDateTime': 1568098272,
        'Keys': {
          'userId': {
            'N': '40309246'
          }
        },
        'NewImage': {
          'skills': {
            'M': {
              '315': {
                'S': '{"hidden":true}'
              }
            }
          },
          'userHandle': {
            'S': 'thomaskranitsas'
          },
          'createdAt': {
            'N': '1545685680000'
          },
          'updatedBy': {
            'S': '40309246'
          },
          'createdBy': {
            'S': '40309246'
          },
          'userId': {
            'N': '40309246'
          },
          'handleLower': {
            'S': 'thomaskranitsas'
          },
          'updatedAt': {
            'N': '1545685680000'
          }
        },
        'SequenceNumber': '9012900000000009201344446',
        'SizeBytes': 165,
        'StreamViewType': 'NEW_AND_OLD_IMAGES'
      },
      'eventSourceARN': 'arn:aws:dynamodb:us-east-1:151253753676:table/MemberEnteredSkills/stream/2019-09-08T09:11:05.328'
    }
  ]
}

const updateEnteredSkillsEvent = {
  'Records': [
    {
      'eventID': '502a087305504a9b7ed7129be886b6dd',
      'eventName': 'MODIFY',
      'eventVersion': '1.1',
      'eventSource': 'aws:dynamodb',
      'awsRegion': 'us-east-1',
      'dynamodb': {
        'ApproximateCreationDateTime': 1568098462,
        'Keys': {
          'userId': {
            'N': '40309246'
          }
        },
        'NewImage': {
          'skills': {
            'M': {
              '315': {
                'S': '{"hidden":false}'
              },
              '323': {
                'S': '{"hidden":true}'
              }
            }
          },
          'userHandle': {
            'S': 'thomaskranitsas'
          },
          'createdAt': {
            'N': '1545685680000'
          },
          'updatedBy': {
            'S': '40309246'
          },
          'createdBy': {
            'S': '40309246'
          },
          'userId': {
            'N': '40309246'
          },
          'handleLower': {
            'S': 'thomaskranitsas'
          },
          'updatedAt': {
            'S': '2019-09-10T21:08Z'
          }
        },
        'OldImage': {
          'skills': {
            'M': {
              '315': {
                'S': '{"hidden":true}'
              }
            }
          },
          'userHandle': {
            'S': 'thomaskranitsas'
          },
          'createdAt': {
            'N': '1545685680000'
          },
          'updatedBy': {
            'S': '40309246'
          },
          'createdBy': {
            'S': '40309246'
          },
          'userId': {
            'N': '40309246'
          },
          'handleLower': {
            'S': 'thomaskranitsas'
          },
          'updatedAt': {
            'N': '1545685680000'
          }
        },
        'SequenceNumber': '9013000000000009201403632',
        'SizeBytes': 350,
        'StreamViewType': 'NEW_AND_OLD_IMAGES'
      },
      'eventSourceARN': 'arn:aws:dynamodb:us-east-1:151253753676:table/MemberEnteredSkills/stream/2019-09-08T09:11:05.328'
    }
  ]
}

const deleteEnteredSkillsEvent = {
  'Records': [
    {
      'eventID': '8d8781f70fe3252a89528fe29c45e739',
      'eventName': 'REMOVE',
      'eventVersion': '1.1',
      'eventSource': 'aws:dynamodb',
      'awsRegion': 'us-east-1',
      'dynamodb': {
        'ApproximateCreationDateTime': 1568098540,
        'Keys': {
          'userId': {
            'N': '40309246'
          }
        },
        'OldImage': {
          'skills': {
            'M': {
              '315': {
                'S': '{"hidden":false}'
              },
              '323': {
                'S': '{"hidden":true}'
              }
            }
          },
          'userHandle': {
            'S': 'thomaskranitsas'
          },
          'createdAt': {
            'N': '1545685680000'
          },
          'updatedBy': {
            'S': '40309246'
          },
          'createdBy': {
            'S': '40309246'
          },
          'userId': {
            'N': '40309246'
          },
          'handleLower': {
            'S': 'thomaskranitsas'
          },
          'updatedAt': {
            'S': '2019-09-10T21:08Z'
          }
        },
        'SequenceNumber': '9013100000000009201428941',
        'SizeBytes': 196,
        'StreamViewType': 'NEW_AND_OLD_IMAGES'
      },
      'eventSourceARN': 'arn:aws:dynamodb:us-east-1:151253753676:table/MemberEnteredSkills/stream/2019-09-08T09:11:05.328'
    }
  ]
}

const createMemberAggregatedSkillsEvent = {
  'Records': [
    {
      'eventID': '9e31038dcc8de53b0241f763526f810d',
      'eventName': 'INSERT',
      'eventVersion': '1.1',
      'eventSource': 'aws:dynamodb',
      'awsRegion': 'us-east-1',
      'dynamodb': {
        'ApproximateCreationDateTime': 1568100671,
        'Keys': {
          'userId': {
            'N': '40309246'
          }
        },
        'NewImage': {
          'skills': {
            'M': {
              '284': {
                'S': '{"tagName":"MySql","hidden":false,"score":3,"sources":["CHALLENGE","USER_ENTERED"]}'
              }
            }
          },
          'userHandle': {
            'S': 'thomaskranitsas'
          },
          'createdAt': {
            'N': '1545685680000'
          },
          'updatedBy': {
            'S': '40309246'
          },
          'createdBy': {
            'S': '40309246'
          },
          'userId': {
            'N': '40309246'
          },
          'handleLower': {
            'S': 'thomaskranitsas'
          },
          'updatedAt': {
            'N': '1545685680000'
          }
        },
        'SequenceNumber': '9101500000000008216489194',
        'SizeBytes': 233,
        'StreamViewType': 'NEW_AND_OLD_IMAGES'
      },
      'eventSourceARN': 'arn:aws:dynamodb:us-east-1:151253753676:table/MemberAggregatedSkills/stream/2019-09-08T09:10:57.423'
    }
  ]
}

const updateMemberAggregatedSkillsEvent = {
  'Records': [
    {
      'eventID': '722bbad7f6c6f52977757e6e254b46c9',
      'eventName': 'MODIFY',
      'eventVersion': '1.1',
      'eventSource': 'aws:dynamodb',
      'awsRegion': 'us-east-1',
      'dynamodb': {
        'ApproximateCreationDateTime': 1568101051,
        'Keys': {
          'userId': {
            'N': '40309246'
          }
        },
        'NewImage': {
          'skills': {
            'M': {
              '286': {
                'S': '{"tagName":"Node.js","hidden":false,"score":58,"sources":["CHALLENGE"]}'
              }
            }
          },
          'userHandle': {
            'S': 'thomaskranitsas'
          },
          'createdAt': {
            'N': '1545685680000'
          },
          'updatedBy': {
            'S': '40309246'
          },
          'createdBy': {
            'S': '40309246'
          },
          'userId': {
            'N': '40309246'
          },
          'handleLower': {
            'S': 'thomaskranitsas'
          },
          'updatedAt': {
            'N': '1568101038667'
          }
        },
        'OldImage': {
          'skills': {
            'M': {
              '284': {
                'S': '{"tagName":"MySql","hidden":false,"score":3,"sources":["CHALLENGE","USER_ENTERED"]}'
              }
            }
          },
          'userHandle': {
            'S': 'thomaskranitsas'
          },
          'createdAt': {
            'N': '1545685680000'
          },
          'updatedBy': {
            'S': '40309246'
          },
          'createdBy': {
            'S': '40309246'
          },
          'userId': {
            'N': '40309246'
          },
          'handleLower': {
            'S': 'thomaskranitsas'
          },
          'updatedAt': {
            'N': '1545685680000'
          }
        },
        'SequenceNumber': '9101600000000008216606734',
        'SizeBytes': 445,
        'StreamViewType': 'NEW_AND_OLD_IMAGES'
      },
      'eventSourceARN': 'arn:aws:dynamodb:us-east-1:151253753676:table/MemberAggregatedSkills/stream/2019-09-08T09:10:57.423'
    }
  ]
}

const deleteMemberAggregatedSkillsEvent = {
  'Records': [
    {
      'eventID': '3cd401a3ccfd5c6ac9c178be4fbfbd22',
      'eventName': 'REMOVE',
      'eventVersion': '1.1',
      'eventSource': 'aws:dynamodb',
      'awsRegion': 'us-east-1',
      'dynamodb': {
        'ApproximateCreationDateTime': 1568101334,
        'Keys': {
          'userId': {
            'N': '40309246'
          }
        },
        'OldImage': {
          'skills': {
            'M': {
              '286': {
                'S': '{"tagName":"Node.js","hidden":false,"score":58,"sources":["CHALLENGE"]}'
              }
            }
          },
          'userHandle': {
            'S': 'thomaskranitsas'
          },
          'createdAt': {
            'N': '1545685680000'
          },
          'updatedBy': {
            'S': '40309246'
          },
          'createdBy': {
            'S': '40309246'
          },
          'userId': {
            'N': '40309246'
          },
          'handleLower': {
            'S': 'thomaskranitsas'
          },
          'updatedAt': {
            'N': '1568101038667'
          }
        },
        'SequenceNumber': '9101700000000008216682638',
        'SizeBytes': 223,
        'StreamViewType': 'NEW_AND_OLD_IMAGES'
      },
      'eventSourceARN': 'arn:aws:dynamodb:us-east-1:151253753676:table/MemberAggregatedSkills/stream/2019-09-08T09:10:57.423'
    }
  ]
}

const expectedResult = {
  createdEnteredSkill: {
    skills: {
      '315': { hidden: true }
    },
    userHandle: 'thomaskranitsas',
    createdAt: '2018-12-24T21:08:00.000Z',
    updatedBy: '40309246',
    createdBy: '40309246',
    userId: 40309246,
    handleLower: 'thomaskranitsas',
    updatedAt: '2018-12-24T21:08:00.000Z'
  },
  updatedEnteredSkill: {
    skills: {
      '315': { hidden: false }, '323': { hidden: true }
    },
    userHandle: 'thomaskranitsas',
    createdAt: '2018-12-24T21:08:00.000Z',
    updatedBy: '40309246',
    createdBy: '40309246',
    userId: 40309246,
    handleLower: 'thomaskranitsas',
    updatedAt: '2019-09-10T21:08:00.000Z'
  },
  createdMemberAggregatedSkill: {
    skills: {
      '284': { tagName: 'MySql', hidden: false, score: 3, sources: ['CHALLENGE', 'USER_ENTERED'] }
    },
    userHandle: 'thomaskranitsas',
    createdAt: '2018-12-24T21:08:00.000Z',
    updatedBy: '40309246',
    createdBy: '40309246',
    userId: 40309246,
    handleLower: 'thomaskranitsas',
    updatedAt: '2018-12-24T21:08:00.000Z'
  },
  updatedMemberAggregatedSkill: {
    skills: {
      '286': { tagName: 'Node.js', hidden: false, score: 58, sources: ['CHALLENGE'] }
    },
    userHandle: 'thomaskranitsas',
    createdAt: '2018-12-24T21:08:00.000Z',
    updatedBy: '40309246',
    createdBy: '40309246',
    userId: 40309246,
    handleLower: 'thomaskranitsas',
    updatedAt: '2019-09-10T07:37:18.667Z'
  }
}

if (process.env.DB_ENTERED_SKILLS_STREAM) {
  createEnteredSkillsEvent.Records[0].eventSourceARN = process.env.DB_ENTERED_SKILLS_STREAM
  updateEnteredSkillsEvent.Records[0].eventSourceARN = process.env.DB_ENTERED_SKILLS_STREAM
  deleteEnteredSkillsEvent.Records[0].eventSourceARN = process.env.DB_ENTERED_SKILLS_STREAM
}

if (process.env.DB_AGGREGATED_SKILLS_STREAM) {
  createMemberAggregatedSkillsEvent.Records[0].eventSourceARN = process.env.DB_AGGREGATED_SKILLS_STREAM
  updateMemberAggregatedSkillsEvent.Records[0].eventSourceARN = process.env.DB_AGGREGATED_SKILLS_STREAM
  deleteMemberAggregatedSkillsEvent.Records[0].eventSourceARN = process.env.DB_AGGREGATED_SKILLS_STREAM
}

function writeJSON (name, object) {
  return new Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, `../test_data/${name}.json`), JSON.stringify(object, null, 2), 'utf8', function (err) {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

if (!module.parent) {
  const jsonObject = {
    createEnteredSkillsEvent,
    updateEnteredSkillsEvent,
    deleteEnteredSkillsEvent,
    createMemberAggregatedSkillsEvent,
    updateMemberAggregatedSkillsEvent,
    deleteMemberAggregatedSkillsEvent
  }
  const promises = []
  for (const name in jsonObject) {
    promises.push(writeJSON(name, jsonObject[name]))
  }
  Promise.all(promises).then(() => {
    console.log('done')
  }).catch(err => {
    console.error(err)
  })
}

module.exports = {
  createEnteredSkillsEvent,
  updateEnteredSkillsEvent,
  deleteEnteredSkillsEvent,
  createMemberAggregatedSkillsEvent,
  updateMemberAggregatedSkillsEvent,
  deleteMemberAggregatedSkillsEvent,
  expectedResult
}
