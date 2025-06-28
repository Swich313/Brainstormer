import _ from 'lodash'

// const ideas = [
//   { id: 'cool-idea-nick-1', name: 'Idea 1', description: 'Description of Idea 1...' },
//   { id: 'cool-idea-nick-2', name: 'Idea 2', description: 'Description of Idea 2...' },
//   { id: 'cool-idea-nick-3', name: 'Idea 3', description: 'Description of Idea 3...' },
//   { id: 'cool-idea-nick-4', name: 'Idea 4', description: 'Description of Idea 4...' },
//   { id: 'cool-idea-nick-5', name: 'Idea 5', description: 'Description of Idea 5...' },
// ]

export const ideas = _.times(100, (i) => ({
  nick: `cool-idea-nick-${i + 1}`,
  name: `Idea ${i + 1}`,
  description: `Description of Idea ${i + 1}...`,
  text: _.times(100, (j) => `<p>Text paragraph ${j + 1} of the idea ${i + 1}...</p>`).join(''),
}))
