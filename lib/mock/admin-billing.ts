import { getAllWorkspaces } from "./admin-workspaces";

// =============================================================================
// Types
// =============================================================================

export type ProjectStatus = "completed" | "invoiced";
export type InvoiceStatus = "pending" | "sent" | "paid";

export interface UninvoicedProject {
  id: string;
  name: string;
  workspaceId: string;
  workspaceName: string;
  workspaceOrgNumber: string;
  imageCount: number;
  amount: number; // 19 kr per project
  completedAt: Date;
}

export interface InvoiceRecord {
  id: string;
  fikenInvoiceId: number;
  fikenInvoiceNumber: string;
  workspaceId: string;
  workspaceName: string;
  workspaceOrgNumber: string;
  projectCount: number;
  projectNames: string[];
  amount: number; // in kr
  amountWithVat: number; // amount + 25% VAT
  status: InvoiceStatus;
  issueDate: Date;
  dueDate: Date;
  createdAt: Date;
}

export interface BillingStats {
  uninvoicedCount: number;
  uninvoicedAmount: number;
  invoicedCount: number;
  invoicedAmount: number;
  invoicedThisMonth: number;
  invoicedAmountThisMonth: number;
  pendingPayment: number;
  pendingPaymentAmount: number;
}

// =============================================================================
// Mock Data Generation
// =============================================================================

const projectNames = [
  "Keizersgracht 15 - Appartement",
  "Vondelpark 8 - Vrijstaand",
  "Stationsstraat 22 - Tussenwoning",
  "Industrieweg 5 - Kantoor",
  "Havengebied 12 - Bedrijfspand",
  "Duinweg 3 - Bungalow",
  "Heuvelstraat 45 - Villa",
  "Centrumplein 1 - Winkelpand",
  "Boslaan 9 - Twee-onder-een-kap",
  "Rivierkade 7 - Vakantiewoning",
  "Zonnelaan 18 - Penthouse",
  "Noordkade 33 - Herenhuis",
  "Havenkade 4 - Watervilla",
  "Dorpsstraat 21 - Boerderij",
  "Uitzichtweg 11 - Moderne villa",
];

// Dutch KVK numbers (8 digits)
const orgNumbers = [
  "12345678",
  "87654321",
  "23456789",
  "34567890",
  "45678901",
  "56789012",
  "67890123",
  "78901234",
  "89012345",
  "90123456",
];

function seededRandom(seed: number): () => number {
  return () => {
    seed = (seed * 1_103_515_245 + 12_345) & 0x7f_ff_ff_ff;
    return seed / 0x7f_ff_ff_ff;
  };
}

function generateUninvoicedProjects(): UninvoicedProject[] {
  const workspaces = getAllWorkspaces();
  const projects: UninvoicedProject[] = [];
  const random = seededRandom(456);

  // Generate 2-4 uninvoiced projects per active workspace
  workspaces
    .filter((w) => w.status === "active")
    .slice(0, 15) // Limit to 15 workspaces
    .forEach((workspace, wsIndex) => {
      const projectCount = 1 + Math.floor(random() * 4); // 1-4 projects

      for (let i = 0; i < projectCount; i++) {
        const projectName =
          projectNames[Math.floor(random() * projectNames.length)];
        const imageCount = 3 + Math.floor(random() * 8); // 3-10 images

        // Completed within last 30 days
        const completedDaysAgo = Math.floor(random() * 30);
        const completedAt = new Date();
        completedAt.setDate(completedAt.getDate() - completedDaysAgo);

        projects.push({
          id: `proj_${String(wsIndex + 1).padStart(3, "0")}_${String(i + 1).padStart(2, "0")}`,
          name: projectName,
          workspaceId: workspace.id,
          workspaceName: workspace.name,
          workspaceOrgNumber: orgNumbers[wsIndex % orgNumbers.length],
          imageCount,
          amount: 19, // Fixed 19 kr per project
          completedAt,
        });
      }
    });

  // Sort by completedAt (newest first)
  return projects.sort(
    (a, b) => b.completedAt.getTime() - a.completedAt.getTime()
  );
}

function generateInvoiceHistory(): InvoiceRecord[] {
  const workspaces = getAllWorkspaces();
  const invoices: InvoiceRecord[] = [];
  const random = seededRandom(789);

  // Generate 20-30 historical invoices
  const invoiceCount = 25;
  const invoiceNumber = 10_026; // Starting from our test invoices

  for (let i = 0; i < invoiceCount; i++) {
    const workspace = workspaces[Math.floor(random() * workspaces.length)];
    const projectCount = 1 + Math.floor(random() * 5); // 1-5 projects per invoice

    // Generate project names for this invoice
    const invoiceProjectNames: string[] = [];
    for (let j = 0; j < projectCount; j++) {
      invoiceProjectNames.push(
        projectNames[Math.floor(random() * projectNames.length)]
      );
    }

    const amount = projectCount * 19; // 19 kr per project
    const amountWithVat = amount * 1.25; // 25% VAT

    // Status distribution: 60% paid, 30% sent, 10% pending
    const statusRoll = random();
    const status: InvoiceStatus =
      statusRoll < 0.6 ? "paid" : statusRoll < 0.9 ? "sent" : "pending";

    // Issue date: within last 90 days
    const issueDaysAgo = Math.floor(random() * 90);
    const issueDate = new Date();
    issueDate.setDate(issueDate.getDate() - issueDaysAgo);

    // Due date: 14 days after issue
    const dueDate = new Date(issueDate);
    dueDate.setDate(dueDate.getDate() + 14);

    invoices.push({
      id: `inv_${String(i + 1).padStart(4, "0")}`,
      fikenInvoiceId: 11_305_900_000 + i,
      fikenInvoiceNumber: String(invoiceNumber + i),
      workspaceId: workspace.id,
      workspaceName: workspace.name,
      workspaceOrgNumber: orgNumbers[i % orgNumbers.length],
      projectCount,
      projectNames: invoiceProjectNames,
      amount,
      amountWithVat,
      status,
      issueDate,
      dueDate,
      createdAt: issueDate,
    });
  }

  // Sort by issueDate (newest first)
  return invoices.sort((a, b) => b.issueDate.getTime() - a.issueDate.getTime());
}

// =============================================================================
// Cached Data
// =============================================================================

const mockUninvoicedProjects = generateUninvoicedProjects();
const mockInvoiceHistory = generateInvoiceHistory();

// =============================================================================
// Public API
// =============================================================================

export function getUninvoicedProjects(): UninvoicedProject[] {
  return mockUninvoicedProjects;
}

export function getInvoiceHistory(): InvoiceRecord[] {
  return mockInvoiceHistory;
}

export function getBillingStats(): BillingStats {
  const uninvoiced = mockUninvoicedProjects;
  const invoices = mockInvoiceHistory;

  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const invoicesThisMonth = invoices.filter(
    (inv) => inv.issueDate >= startOfMonth
  );
  const pendingInvoices = invoices.filter((inv) => inv.status !== "paid");

  return {
    uninvoicedCount: uninvoiced.length,
    uninvoicedAmount: uninvoiced.reduce((sum, p) => sum + p.amount, 0),
    invoicedCount: invoices.length,
    invoicedAmount: invoices.reduce((sum, inv) => sum + inv.amount, 0),
    invoicedThisMonth: invoicesThisMonth.length,
    invoicedAmountThisMonth: invoicesThisMonth.reduce(
      (sum, inv) => sum + inv.amount,
      0
    ),
    pendingPayment: pendingInvoices.length,
    pendingPaymentAmount: pendingInvoices.reduce(
      (sum, inv) => sum + inv.amount,
      0
    ),
  };
}

// Group uninvoiced projects by workspace for batch invoicing
export function getUninvoicedByWorkspace(): Map<
  string,
  {
    workspace: { id: string; name: string; orgNumber: string };
    projects: UninvoicedProject[];
    totalAmount: number;
  }
> {
  const grouped = new Map<
    string,
    {
      workspace: { id: string; name: string; orgNumber: string };
      projects: UninvoicedProject[];
      totalAmount: number;
    }
  >();

  for (const project of mockUninvoicedProjects) {
    const existing = grouped.get(project.workspaceId);

    if (existing) {
      existing.projects.push(project);
      existing.totalAmount += project.amount;
    } else {
      grouped.set(project.workspaceId, {
        workspace: {
          id: project.workspaceId,
          name: project.workspaceName,
          orgNumber: project.workspaceOrgNumber,
        },
        projects: [project],
        totalAmount: project.amount,
      });
    }
  }

  return grouped;
}

// Format amount in EUR
export function formatEUR(amount: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
