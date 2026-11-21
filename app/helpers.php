<?php

if (! function_exists('webpack_asset')) {
    /**
     * Resolve um arquivo compilado pelo Webpack através do manifest.
     */
    function webpack_asset(string $name): string
    {
        static $manifest;

        if ($manifest === null) {
            $path = public_path('assets/manifest.json');

            if (! is_file($path)) {
                throw new RuntimeException(
                    'Webpack manifest not found. Run `npm run build` before serving the application.'
                );
            }

            $manifest = json_decode((string) file_get_contents($path), true, flags: JSON_THROW_ON_ERROR);
        }

        if (! isset($manifest[$name])) {
            throw new RuntimeException(sprintf('Asset [%s] is missing from the Webpack manifest.', $name));
        }

        return asset('assets/'.ltrim($manifest[$name], '/'));
    }
}
