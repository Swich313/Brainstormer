export const App = () => {
  const ideas = [
    { nick: 'cool-idea-nuck-1', name: 'Idea 1', description: 'Description of Idea 1...' },
    { nick: 'cool-idea-nuck-2', name: 'Idea 2', description: 'Description of Idea 2...' },
    { nick: 'cool-idea-nuck-3', name: 'Idea 3', description: 'Description of Idea 3...' },
    { nick: 'cool-idea-nuck-4', name: 'Idea 4', description: 'Description of Idea 4...' },
    { nick: 'cool-idea-nuck-5', name: "Idea 5", description: 'Description of Idea 5...' },
  ]

  return (
    <div className="App">
      <h1>Brainstormer</h1>
      {ideas.map((idea) => {
        return (
          <div key={idea.nick}>
            <h2>{idea.name}</h2>
            <p>{idea.description}</p>
          </div>
        )
      })}
    </div>
  )
};
