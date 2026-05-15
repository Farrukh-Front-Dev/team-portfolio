/**
 * Team Data Utilities
 * 
 * Re-exports content from the centralized content loader
 * and provides backward compatibility
 */

export {
  teamData,
  getTeamMember,
  getMemberProjects,
  getAllProjects,
  getProjectsByType,
  getTeamProjects,
  getTeamMembers,
  getTeamInfo,
  getServices,
  searchProjectsByTech,
  getProjectCount,
  getTotalProjectCount
} from '@content/index';
