/**
 * Centralized Content Loader
 * 
 * This file aggregates all content from separate JSON files
 * and provides a unified API for accessing team data.
 * 
 * Benefits:
 * - Single source of truth
 * - Type-safe access
 * - Easy to maintain
 * - Modular structure
 */

import teamInfo from './team/info.json';
import membersData from './team/members.json';
import teamProjectsData from './team/projects.json';
import servicesData from './team/services.json';
import type { TeamData, TeamMember, TeamProject, Service } from '@/_types';

// Type assertions for JSON imports
const members = membersData as TeamMember[];
const teamProjects = teamProjectsData as TeamProject[];
const services = servicesData as Service[];

/**
 * Main team data object
 * Combines all content from separate files
 */
export const teamData: TeamData = {
  team: teamInfo as TeamData['team'],
  members,
  teamProjects,
  services
};

/**
 * Get a specific team member by ID
 * @param id - Member ID (e.g., 'farrukh', 'backend-dev')
 * @returns TeamMember object or undefined
 */
export function getTeamMember(id: string): TeamMember | undefined {
  return members.find(member => member.id === id);
}

/**
 * Get all projects for a specific team member
 * @param memberId - Member ID
 * @returns Array of projects
 */
export function getMemberProjects(memberId: string): TeamProject[] {
  const member = getTeamMember(memberId);
  return member?.projects || [];
}

/**
 * Get all projects (team + individual)
 * @returns Array of all projects
 */
export function getAllProjects(): TeamProject[] {
  const individualProjects = members.flatMap(member => member.projects);
  return [...teamProjects, ...individualProjects];
}

/**
 * Get projects by type
 * @param type - 'team' or 'individual'
 * @returns Filtered array of projects
 */
export function getProjectsByType(type: 'team' | 'individual'): TeamProject[] {
  return getAllProjects().filter(project => project.type === type);
}

/**
 * Get team projects only
 * @returns Array of team projects
 */
export function getTeamProjects(): TeamProject[] {
  return teamProjects;
}

/**
 * Get all team members
 * @returns Array of team members
 */
export function getTeamMembers(): TeamMember[] {
  return members;
}

/**
 * Get team info
 * @returns Team information object
 */
export function getTeamInfo() {
  return teamInfo;
}

/**
 * Get all services
 * @returns Array of services
 */
export function getServices() {
  return services;
}

/**
 * Search projects by technology
 * @param tech - Technology name (e.g., 'React', 'Django')
 * @returns Array of matching projects
 */
export function searchProjectsByTech(tech: string): TeamProject[] {
  return getAllProjects().filter(project => {
    if (Array.isArray(project.technologies)) {
      return project.technologies.some(t => 
        t.toLowerCase().includes(tech.toLowerCase())
      );
    } else {
      const allTechs = [
        ...project.technologies.frontend,
        ...project.technologies.backend
      ];
      return allTechs.some(t => 
        t.toLowerCase().includes(tech.toLowerCase())
      );
    }
  });
}

/**
 * Get project count by member
 * @param memberId - Member ID
 * @returns Number of projects
 */
export function getProjectCount(memberId: string): number {
  return getMemberProjects(memberId).length;
}

/**
 * Get total project count
 * @returns Total number of projects
 */
export function getTotalProjectCount(): number {
  return getAllProjects().length;
}
