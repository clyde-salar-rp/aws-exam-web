// Topic definitions ported from Python topic_mapper.py

export const SUBTOPICS: Record<string, string> = {
  cloud_computing: "Cloud Computing",
  iam: "IAM",
  ec2: "EC2",
  ec2_storage: "EC2 Storage",
  elb_asg: "ELB & ASG",
  s3: "S3",
  databases: "Databases",
  other_compute: "Other Compute",
  deploying: "Deploying",
  global_infrastructure: "Global Infrastructure",
  cloud_integration: "Cloud Integration",
  cloud_monitoring: "Cloud Monitoring",
  vpc: "VPC",
  security_compliance: "Security & Compliance",
  machine_learning: "Machine Learning",
  account_billing: "Account & Billing",
  advanced_identity: "Advanced Identity",
  other_services: "Other Services",
  architecting_ecosystem: "Architecting & Ecosystem",
};

// 13 study sections matching Obsidian modules
export const SECTIONS: Record<string, string> = {
  module_1_intro_cloud: "Module 1: Introduction to the Cloud",
  module_2_compute: "Module 2: Compute in the Cloud",
  module_3_compute_services: "Module 3: Exploring Compute Services",
  module_4_going_global: "Module 4: Going Global",
  module_5_networking: "Module 5: Networking",
  module_6_storage: "Module 6: Storage",
  module_7_databases: "Module 7: Databases",
  module_8_ai_ml_analytics: "Module 8: AI, ML and Data Analytics",
  module_9_security: "Module 9: Security",
  module_10_monitoring: "Module 10: Monitoring, Compliance, and Governance",
  module_11_pricing: "Module 11: Pricing and Support",
  module_12_migration: "Module 12: Migrating to the AWS Cloud",
  module_13_well_architected: "Module 13: Well-Architected Solutions",
};

export const SECTION_FILE_MAPPING: Record<string, string> = {
  // 13-module section files (Obsidian source of truth)
  module_1_intro_cloud: "module_1_intro_cloud.md",
  module_2_compute: "module_2_compute.md",
  module_3_compute_services: "module_3_compute_services.md",
  module_4_going_global: "module_4_going_global.md",
  module_5_networking: "module_5_networking.md",
  module_6_storage: "module_6_storage.md",
  module_7_databases: "module_7_databases.md",
  module_8_ai_ml_analytics: "module_8_ai_ml_analytics.md",
  module_9_security: "module_9_security.md",
  module_10_monitoring: "module_10_monitoring.md",
  module_11_pricing: "module_11_pricing.md",
  module_12_migration: "module_12_migration.md",
  module_13_well_architected: "module_13_well_architected.md",
};

export function getSubtopicDisplayName(subtopic: string): string {
  return SECTIONS[subtopic] || SUBTOPICS[subtopic] || subtopic.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}

export function getAllSubtopics(): Array<{ id: string; display_name: string }> {
  return Object.entries(SECTIONS).map(([id, display_name]) => ({
    id,
    display_name,
  }));
}

export function getAllSectionIds(): Array<{ id: string; display_name: string }> {
  return Object.entries(SECTIONS).map(([id, display_name]) => ({
    id,
    display_name,
  }));
}
