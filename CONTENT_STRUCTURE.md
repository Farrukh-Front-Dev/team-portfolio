# 📁 Content Structure Documentation

## Overview

This project uses a **modular content structure** where data is split into separate JSON files for better maintainability, scalability, and team collaboration.

---

## 🎯 Architecture Decision

### Why Split Content?

**Before (Single File):**
```
❌ teamData.json (500+ lines)
   - Hard to navigate
   - Merge conflicts
   - One person editing blocks others
```

**After (Modular):**
```
✅ team/
   ├── info.json      (20 lines)
   ├── members.json   (200 lines)
   ├── projects.json  (150 lines)
   └── services.json  (80 lines)
   
   - Easy to find and edit
   - Parallel editing
   - Clear separation of concerns
```

---

## 📂 Directory Structure

```
app/(site)/_content/
├── team/
│   ├── info.json           # Team general information
│   ├── members.json        # All team members
│   ├── projects.json       # Team collaborative projects
│   ├── services.json       # Services offered
│   └── README.md           # Documentation
├── index.ts                # Centralized content loader
├── content.json            # Legacy (not used)
├── skills.tsx              # Legacy (not used)
└── ProjectsContent.tsx     # Legacy (not used)
```

---

## 🔄 Data Flow

```
JSON Files → index.ts → teamData.ts → Components
   ↓            ↓           ↓            ↓
 Storage    Loader      Utils       Display
```

### 1. **JSON Files** (Storage Layer)
- Raw data in separate files
- Easy to edit
- Version controlled

### 2. **index.ts** (Loader Layer)
- Imports all JSON files
- Combines into single object
- Provides helper functions

### 3. **teamData.ts** (Utils Layer)
- Re-exports from index.ts
- Backward compatibility
- Additional utilities

### 4. **Components** (Display Layer)
- Import from `@lib/teamData`
- Use helper functions
- Render UI

---

## 💻 Usage Examples

### Basic Usage

```typescript
import { teamData } from '@lib/teamData';

// Access team info
console.log(teamData.team.name); // "DevDuo"

// Access members
console.log(teamData.members); // Array of members

// Access projects
console.log(teamData.teamProjects); // Array of team projects

// Access services
console.log(teamData.services); // Array of services
```

### Using Helper Functions

```typescript
import {
  getTeamMember,
  getMemberProjects,
  getAllProjects,
  getProjectsByType,
  searchProjectsByTech
} from '@lib/teamData';

// Get specific member
const farrukh = getTeamMember('farrukh');

// Get member's projects
const projects = getMemberProjects('farrukh');

// Get all projects (team + individual)
const allProjects = getAllProjects();

// Filter by type
const teamProjects = getProjectsByType('team');
const individualProjects = getProjectsByType('individual');

// Search by technology
const reactProjects = searchProjectsByTech('React');
const djangoProjects = searchProjectsByTech('Django');
```

---

## 📝 Editing Content

### Updating Team Information

**File:** `app/(site)/_content/team/info.json`

```json
{
  "name": "Your Team Name",
  "tagline": "Your Tagline",
  "description": "Your description...",
  ...
}
```

### Adding a New Team Member

**File:** `app/(site)/_content/team/members.json`

```json
[
  {
    "id": "new-member",
    "name": "New Member Name",
    "role": "Developer",
    ...
  }
]
```

### Adding a Team Project

**File:** `app/(site)/_content/team/projects.json`

```json
[
  {
    "name": "New Project",
    "description": "Description...",
    "type": "team",
    "contributors": ["member1", "member2"],
    ...
  }
]
```

### Adding a Service

**File:** `app/(site)/_content/team/services.json`

```json
[
  {
    "title": "New Service",
    "description": "Description...",
    "technologies": [...],
    ...
  }
]
```

---

## 🎨 Type Safety

All content is fully typed using TypeScript:

```typescript
// app/_types/team.ts
export type TeamMember = {
  id: string;
  name: string;
  role: string;
  ...
};

export type TeamProject = {
  name: string;
  description: string;
  type: 'individual' | 'team';
  ...
};

export type TeamData = {
  team: TeamInfo;
  members: TeamMember[];
  teamProjects: TeamProject[];
  services: Service[];
};
```

---

## 🚀 Benefits

### 1. **Maintainability**
- Small, focused files
- Easy to find and edit
- Clear structure

### 2. **Scalability**
- Add new members easily
- Add new projects easily
- No file size issues

### 3. **Collaboration**
- Multiple people can edit simultaneously
- Fewer merge conflicts
- Clear ownership

### 4. **Performance**
- Tree-shaking friendly
- Smaller bundle size
- Faster builds

### 5. **Type Safety**
- Full TypeScript support
- Autocomplete in IDE
- Compile-time errors

---

## 🔍 Helper Functions Reference

| Function | Description | Returns |
|----------|-------------|---------|
| `getTeamMember(id)` | Get member by ID | `TeamMember \| undefined` |
| `getMemberProjects(id)` | Get member's projects | `TeamProject[]` |
| `getAllProjects()` | Get all projects | `TeamProject[]` |
| `getProjectsByType(type)` | Filter by type | `TeamProject[]` |
| `getTeamProjects()` | Get team projects only | `TeamProject[]` |
| `getTeamMembers()` | Get all members | `TeamMember[]` |
| `getTeamInfo()` | Get team info | `TeamInfo` |
| `getServices()` | Get all services | `Service[]` |
| `searchProjectsByTech(tech)` | Search by technology | `TeamProject[]` |
| `getProjectCount(id)` | Count member's projects | `number` |
| `getTotalProjectCount()` | Count all projects | `number` |

---

## 📊 Content Statistics

- **Team Members**: 2
- **Team Projects**: 3
- **Individual Projects**: 8 (4 per member)
- **Services**: 4
- **Total Projects**: 11

---

## 🛠️ Migration Guide

### From Old Structure

**Old:**
```typescript
import teamData from '@content/teamData.json';
```

**New:**
```typescript
import { teamData } from '@lib/teamData';
// or
import { teamData } from '@content';
```

All existing code continues to work! ✅

---

## 🎯 Best Practices

1. **Keep JSON Valid**: Always validate before committing
2. **Use Consistent IDs**: lowercase-with-hyphens
3. **Update README**: Document changes in team/README.md
4. **Test After Changes**: Run `npm run build`
5. **Commit Separately**: One file per commit for clarity

---

## 📚 Related Documentation

- [Team Content README](./app/(site)/_content/team/README.md)
- [Type Definitions](./app/_types/team.ts)
- [Content Loader](./app/(site)/_content/index.ts)

---

**Last Updated**: 2026-05-12  
**Version**: 2.0.0  
**Architecture**: Modular Content Structure
