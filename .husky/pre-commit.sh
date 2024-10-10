#!/bin/sh

. "$(dirname -- "$0")/_/husky.sh"

echo 'Pre commit hook running...'

bun run lint-staged

echo 'Building...'

bun run build ||
    (
        echo 'Next build failed: View the errors above to see why.'
        false
    )

echo 'All checks succeeded'
