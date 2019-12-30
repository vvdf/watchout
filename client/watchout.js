// start slingin' some d3 here.

// basic game rules:
  // movable player piece
  // randomly generated simple pathing enemies
  // if player hit, score reset
  // score increases with time

class Entity {
  constructor(id = 0) {
    this.id = id;
    this.x = rng.float(engine.options.width);
    this.y = rng.float(engine.options.height);
  }

  moveRng() {
    this.x = rng.float(engine.options.width);
    this.y = rng.float(engine.options.height);
  }
};

var engine = {
  options: {
    height: 500,
    width: 1000,
    nEnemies: 20,
    nPlayers: 1
  },

  stats: {
    score: 0,
    bestScore: 0
  },

  update: () => _.each(entityData, i => i.moveRng()),

  render: () => {
    // JOIN
    var entities = d3.select(".board svg")
      .selectAll("circle")
      .data(entityData);

    // UPDATE: update still present old elements
    entities
      .transition()
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);

    // ENTER: add new elements
    entities.enter()
      .append("circle")
      .attr("cx", d => d.x)
      .attr("cy", d => d.y)
      .attr("r", 10)
      .attr("fill", () => rng.rgb());

    // EXIT: remove unselected old elements
    entities.exit().remove();
  }
}

var rng = {
  float: ceil => Math.random() * ceil,
  int: ceil => Number.parseInt(Math.random() * ceil),
  rgb: function() { return `rgb(${this.int(255)},${this.int(255)},${this.int(255)})`; },
  rgba: function() { return `rgb(${this.int(255)},${this.int(255)},${this.int(255)},${this.float(1)})`; }
};



// initialization
var entityData = _.range(engine.options.nPlayers + engine.options.nEnemies).map(i => new Entity(i));

var svg = d3.select(".board")
  .append("svg")
  .attr("width", engine.options.width)
  .attr("height", engine.options.height)
  .append("rect")
  .attr("width", "100%")
  .attr("height", "100%")
  .attr("fill", "black");

// start primary game loop
setInterval(() => {
  engine.update();
  engine.render();
  }, 1000);