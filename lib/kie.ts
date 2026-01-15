/**
 * Kie.ai Client Library
 *
 * HTTP client for Kie.ai's Nano Banana Pro image editing API.
 * Used as the primary AI provider for image enhancement.
 */

// ============================================================================
// Configuration
// ============================================================================

const KIE_API_BASE_URL = "https://api.kie.ai/api/v1";
const KIE_CREATE_TASK_ENDPOINT = "/jobs/createTask";
const KIE_GET_TASK_ENDPOINT = "/jobs/getTask";

// Polling configuration
const POLL_INTERVAL_MS = 2000; // 2 seconds
const MAX_POLL_ATTEMPTS = 90; // 3 minutes max wait

// ============================================================================
// Types
// ============================================================================

export interface KieCreateTaskInput {
  model: string;
  task_type: "img2img" | "txt2img";
  input: {
    prompt: string;
    image_url?: string; // For img2img
    aspect_ratio?: string;
    output_format?: "jpeg" | "png" | "webp";
  };
}

export interface KieCreateTaskResponse {
  code: number;
  message: string;
  data?: {
    task_id: string;
  };
}

export interface KieGetTaskResponse {
  code: number;
  message: string;
  data?: {
    task_id: string;
    status: "pending" | "processing" | "completed" | "failed";
    output?: {
      images: Array<{
        url: string;
        width?: number;
        height?: number;
      }>;
    };
    error?: string;
  };
}

export interface KieNanoBananaProOutput {
  images: Array<{
    url: string;
    content_type: string;
    width?: number;
    height?: number;
  }>;
}

export interface KieErrorResponse {
  error?: {
    message: string;
    code?: string;
  };
  message?: string;
  code?: number;
}

// ============================================================================
// Client
// ============================================================================

class KieClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  /**
   * Create a task for image generation/editing
   */
  private async createTask(input: KieCreateTaskInput): Promise<string> {
    const url = `${KIE_API_BASE_URL}${KIE_CREATE_TASK_ENDPOINT}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    });

    if (!response.ok) {
      let errorMessage = `Kie.ai API error: ${response.status}`;
      try {
        const errorBody = (await response.json()) as KieErrorResponse;
        errorMessage = `Kie.ai API error: ${errorBody.message || errorBody.error?.message || response.status}`;
      } catch {
        // Ignore JSON parsing errors
      }
      throw new Error(errorMessage);
    }

    const result = (await response.json()) as KieCreateTaskResponse;

    if (result.code !== 0 && result.code !== 200) {
      throw new Error(`Kie.ai task creation failed: ${result.message}`);
    }

    if (!result.data?.task_id) {
      throw new Error("Kie.ai returned no task_id");
    }

    return result.data.task_id;
  }

  /**
   * Poll for task completion
   */
  private async waitForTask(taskId: string): Promise<KieGetTaskResponse["data"]> {
    const url = `${KIE_API_BASE_URL}${KIE_GET_TASK_ENDPOINT}`;

    for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
      const response = await fetch(`${url}?task_id=${taskId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Kie.ai getTask error: ${response.status}`);
      }

      const result = (await response.json()) as KieGetTaskResponse;

      if (!result.data) {
        throw new Error(`Kie.ai getTask returned no data`);
      }

      switch (result.data.status) {
        case "completed":
          return result.data;
        case "failed":
          throw new Error(`Kie.ai task failed: ${result.data.error || "Unknown error"}`);
        case "pending":
        case "processing":
          // Wait and retry
          await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL_MS));
          break;
        default:
          throw new Error(`Unknown task status: ${result.data.status}`);
      }
    }

    throw new Error("Kie.ai task timed out after 3 minutes");
  }

  /**
   * Generate/edit images using Nano Banana Pro model
   */
  async nanoBananaPro(input: {
    prompt: string;
    image_url: string;
    output_format?: "jpeg" | "png" | "webp";
  }): Promise<KieNanoBananaProOutput> {
    // Create the task
    const taskId = await this.createTask({
      model: "nano banana pro",
      task_type: "img2img",
      input: {
        prompt: input.prompt,
        image_url: input.image_url,
        output_format: input.output_format || "jpeg",
      },
    });

    // Wait for completion
    const taskResult = await this.waitForTask(taskId);

    if (!taskResult?.output?.images?.length) {
      throw new Error("Kie.ai returned no images");
    }

    return {
      images: taskResult.output.images.map((img) => ({
        url: img.url,
        content_type: `image/${input.output_format || "jpeg"}`,
        width: img.width,
        height: img.height,
      })),
    };
  }
}

// ============================================================================
// Singleton Export
// ============================================================================

let kieInstance: KieClient | null = null;

/**
 * Get the Kie.ai client instance.
 * Lazily initialized with KIE_API_KEY environment variable.
 */
export function getKieClient(): KieClient {
  if (!kieInstance) {
    const apiKey = process.env.KIE_API_KEY;

    if (!apiKey) {
      throw new Error(
        "KIE_API_KEY environment variable is not set. " +
          "Please add your Kie.ai API key to .env.local"
      );
    }

    kieInstance = new KieClient(apiKey);
  }

  return kieInstance;
}

/**
 * Check if Kie.ai is configured (API key is present)
 */
export function isKieConfigured(): boolean {
  return !!process.env.KIE_API_KEY;
}
