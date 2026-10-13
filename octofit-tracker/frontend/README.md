# OctoFit Tracker frontend

In a GitHub Codespace, `VITE_CODESPACE_NAME` must be defined in
`octofit-tracker/frontend/.env.local`. Set it to the Codespace name (without the
`-8000.app.github.dev` suffix):

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Vite exposes this value to the browser, so only put non-secret configuration in
it. Restart the Vite development server after changing `.env.local`.

If the variable is unset, the frontend uses `http://localhost:8000`, which is
suitable when running the API locally.
