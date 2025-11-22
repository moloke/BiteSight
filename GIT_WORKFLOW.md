# Git Workflow for BiteSight Development

## Branch Strategy

For all future development, we'll use feature branches and pull requests:

### Creating a New Feature Branch

```bash
# Make sure you're on main and up to date
git checkout main
git pull origin main

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name

# Examples:
# git checkout -b feature/cloud-functions
# git checkout -b feature/image-search
# git checkout -b feature/llm-normalization
```

### Working on Your Branch

```bash
# Make changes to files
# ...

# Stage and commit changes
git add .
git commit -m "Description of changes"

# Push to GitHub
git push origin feature/your-feature-name
```

### Creating a Pull Request

After pushing your branch:

1. Go to https://github.com/moloke/BiteSight
2. Click "Compare & pull request" button
3. Add a description of your changes
4. Click "Create pull request"
5. Review the changes
6. Merge when ready

### Merging Back to Main

After PR is merged on GitHub:

```bash
# Switch back to main
git checkout main

# Pull the latest changes
git pull origin main

# Delete the local feature branch (optional)
git branch -d feature/your-feature-name
```

## Branch Naming Conventions

- `feature/` - New features (e.g., `feature/cloud-functions`)
- `fix/` - Bug fixes (e.g., `fix/ocr-confidence`)
- `refactor/` - Code refactoring (e.g., `refactor/firebase-services`)
- `docs/` - Documentation updates (e.g., `docs/setup-guide`)

## Commit Message Guidelines

Write clear, descriptive commit messages:

```
Good:
- "Add LLM normalization endpoint to Cloud Functions"
- "Fix text grouping algorithm for multi-column menus"
- "Update Firebase security rules for production"

Bad:
- "fix bug"
- "update code"
- "changes"
```

## Current Branches

- `main` - Production-ready code
- Feature branches will be created as needed

---

**Next feature branch will be created automatically when starting new work!**
