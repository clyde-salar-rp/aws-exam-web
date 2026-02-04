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

export const SECTION_FILE_MAPPING: Record<string, string> = {
  cloud_computing: "cloud_computing.md",
  iam: "iam.md",
  ec2: "ec2.md",
  ec2_storage: "ec2_storage.md",
  elb_asg: "elb_asg.md",
  s3: "s3.md",
  databases: "databases.md",
  other_compute: "other_compute.md",
  deploying: "deploying.md",
  global_infrastructure: "global_infrastructure.md",
  cloud_integration: "cloud_integration.md",
  cloud_monitoring: "cloud_monitoring.md",
  vpc: "vpc.md",
  security_compliance: "security_compliance.md",
  machine_learning: "machine_learning.md",
  account_billing: "account_management_billing_support.md",
  advanced_identity: "advanced_identity.md",
  other_services: "other_aws_services.md",
  architecting_ecosystem: "architecting_and_ecosystem.md",
};

export function getSubtopicDisplayName(subtopic: string): string {
  return SUBTOPICS[subtopic] || subtopic.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());
}

export function getAllSubtopics(): Array<{ id: string; display_name: string }> {
  return Object.entries(SUBTOPICS).map(([id, display_name]) => ({
    id,
    display_name,
  }));
}
