import {NextResponse} from "next/server";
import Section from "@/models/Section";
import {authenticateUser} from "@/utils/auth";

export async function GET(req: Request) {
  console.log("GET /api/sections");

  try {
    // Authenticate the user
    const user = await authenticateUser(req);
    if (!user) {
      return NextResponse.json({error: "Unauthorized"}, {status: 401});
    }

    // Parse query parameters
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const courseCode = url.searchParams.get("courseCode");

    // Check user's access to sections based on their courses
    const allowedCourseCodes = user.courses.map((course) => course.code);

    if (id) {
      // Fetch a specific section by its ID, ensuring the user has access
      const section = await Section.findOne({_id: id, courseCode: {$in: allowedCourseCodes}}).lean();
      if (!section) {
        return NextResponse.json({error: "Section not found or access denied"}, {status: 404});
      }
      return NextResponse.json(section, {status: 200});
    }

    if (courseCode) {
      // Check if the user has access to the requested course
      if (!allowedCourseCodes.includes(courseCode)) {
        return NextResponse.json({error: "Access denied: Not allowed to view this course"}, {status: 403});
      }

      // Fetch all sections for the specified courseCode
      const sections = await Section.find({courseCode}).lean();
      return NextResponse.json(sections, {status: 200});
    }

    // Fetch all sections for all courses the user has access to
    const sections = await Section.find({courseCode: {$in: allowedCourseCodes}}).lean();
    return NextResponse.json(sections, {status: 200});
  } catch (error) {
    console.error("Error in GET /api/sections:", error);
    return NextResponse.json({error: "Internal server error"}, {status: 500});
  }
}
