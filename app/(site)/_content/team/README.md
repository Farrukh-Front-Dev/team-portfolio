# Team Content Structure

This directory contains all team-related content in a modular, maintainable structure.

## 📁 File Structure

```
team/
├── info.json       # Team general information
├── members.json    # All team members
├── projects.json   # Team collaborative projects
├── services.json   # Services offered by the team
└── README.md       # This file
```

## 📝 File Descriptions

### `info.json`
Contains general team information:
- Team name and tagline
- Description and mission
- Contact information
- Technologies used
- Experience and project count

**When to edit:** When team info changes (name, contact, tech stack)

### `members.json`
Array of all team members with:
- Personal information
- Skills and experience
- Education history
- Contact details
- Individual projects

**When to edit:** 
- Adding/removing team members
- Updating member information
- Adding new individual projects

### `projects.json`
Array of team collaborative projects with:
- Project name and description
- Technologies (frontend + backend)
- Features list
- Links (demo, repo)
- Contributors

**When to edit:**
- Adding new team projects
- Updating project information
- Changing project status

### `services.json`
Array of services offered by the team:
- Service title and description
- Technologies used
- Deliverables
- Icon identifier

**When to edit:**
- Adding new services
- Updating service descriptions
- Changing pricing/deliverables

## 🔄 How to Update Content

### Adding a New Team Member

1. Open `members.json`
2. Add new member object to the array:

```json
{
  "id": "unique-id",
  "name": "Full Name",
  "role": "Role",
  "title": "Title",
  "bio": "Bio text...",
  "image": "/path/to/image.png",
  "skills": ["Skill1", "Skill2"],
  "experience": "2024 — Present",
  "education": [...],
  "contact": {...},
  "projects": [...]
}
```

3. Save the file
4. The changes will be reflected automatically

### Adding a New Team Project

1. Open `projects.json`
2. Add new project object to the array:

```json
{
  "name": "Project Name",
  "description": "Description...",
  "link": "https://github.com/...",
  "demo": "https://demo.com",
  "imageLight": "/path/to/image.png",
  "imageDark": "/path/to/image-dark.png",
  "technologies": {
    "frontend": ["Tech1", "Tech2"],
    "backend": ["Tech3", "Tech4"]
  },
  "features": ["Feature 1", "Feature 2"],
  "type": "team",
  "contributors": ["member-id-1", "member-id-2"]
}
```

3. Save the file

### Updating Team Information

1. Open `info.json`
2. Edit the relevant fields
3. Save the file

## 🎯 Best Practices

1. **Keep JSON Valid**: Always validate JSON syntax before saving
2. **Use Consistent IDs**: Member IDs should be lowercase with hyphens
3. **Image Paths**: Use relative paths starting with `/`
4. **Array Order**: Keep items in logical order (newest first for projects)
5. **Descriptions**: Keep descriptions concise but informative
6. **Technologies**: Use official names (e.g., "Next.js" not "nextjs")

## 🔍 Data Access

All content is accessed through the centralized loader:

```typescript
import { teamData, getTeamMember, getAllProjects } from '@content';

// Get all data
const data = teamData;

// Get specific member
const member = getTeamMember('farrukh');

// Get all projects
const projects = getAllProjects();
```

## 📊 Content Statistics

- **Team Members**: 2
- **Team Projects**: 3
- **Services**: 4
- **Total Individual Projects**: 8

## 🚀 Future Enhancements

- [ ] Add project categories
- [ ] Add testimonials
- [ ] Add blog posts
- [ ] Add case studies
- [ ] Add team achievements

---

**Last Updated**: 2026-05-12
**Maintained By**: DevDuo Team
