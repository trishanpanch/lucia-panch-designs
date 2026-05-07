# Lucia Panch Designs

Static homepage for Lucia Panch Designs.

## Local Preview

Open `index.html` in a browser, or run:

```bash
python3 -m http.server 4173 --bind 127.0.0.1
```

Then visit `http://127.0.0.1:4173`.

## Deployment

The site is packaged as an Nginx container for Cloud Run. Cloud Build uses
`cloudbuild.yaml` to build the image, push it to Artifact Registry, and deploy
the `lucia-panch-designs` Cloud Run service.
