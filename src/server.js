const Hapi = require("@hapi/hapi");
const notes = require("./api/notes");
const NotesServices = require("./services/inMemory/NotesServices");

const init = async () => {
  const notesService = new NotesServices();
  const server = Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  await server.register({
    plugin: notes,
    options: {
      service: notesService,
    },
  });

  await server.start();
  console.log(`Server running on ${server.info.uri}`);
};

init();
