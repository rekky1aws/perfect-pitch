# Pefect Pitch Trainer

Small webpage project to learn musical perfect pitch.
## Technologies


:writing_hand: TypeScript

:dash: Tailwind CSS

:wrench: Node Package Manager


## Usage
To start compiling, there is a few commands to enter :
```bash
npx tailwindcss -i ./src/style/input.css -o ./dist/style/output.css --watch
npx tsc ./src/script/app.ts --outDir ./dist/script/ --watch
php -S 0.0.0.0:8000
```

You can do it to see all errors and warning.
All commands must be started in different instances of terminal.

Otherwise, you can execute `bin/run` to execute all commands above. It will open other process in new tabs of the terminal.
Don't forget to quit them we you don't need it anymore or before restarting it.