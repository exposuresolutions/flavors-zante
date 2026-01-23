import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';
import path from 'path';

const execAsync = promisify(exec);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { action } = body;
        
        // Security check: Only allow specific commands
        if (action === 'cleanup') {
            const scriptPath = path.resolve('../scripts/deep-cleaner.ps1');
            console.log(`Executing cleanup script: ${scriptPath}`);
            
            // Note: This requires the server to be running with permissions to execute scripts
            // In dev mode on Windows this usually works if shell has permissions
            const { stdout, stderr } = await execAsync(`powershell -ExecutionPolicy Bypass -File "${scriptPath}"`);
            
            return NextResponse.json({ 
                success: true, 
                message: 'Cleanup initiated successfully.', 
                details: stdout 
            });
        }
        
        if (action === 'status') {
             // Mock status check
             return NextResponse.json({
                success: true,
                cpu: '12%',
                memory: '4.2GB / 16GB',
                disk: '1.2TB Free'
             });
        }

        return NextResponse.json({ success: false, message: 'Unknown command' }, { status: 400 });
    } catch (error: any) {
        console.error('System API Error:', error);
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}
