/**
 * MOTECH PLATFORM OPENSOURCE LICENSE AGREEMENT
 *
 * Copyright (c) 2011 Grameen Foundation USA.  All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * 1. Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 *
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 * this list of conditions and the following disclaimer in the documentation
 * and/or other materials provided with the distribution.
 *
 * 3. Neither the name of Grameen Foundation USA, nor its respective contributors
 * may be used to endorse or promote products derived from this software without
 * specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY GRAMEEN FOUNDATION USA AND ITS CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED.  IN NO EVENT SHALL GRAMEEN FOUNDATION USA OR ITS CONTRIBUTORS
 * BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
 * IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY
 * OF SUCH DAMAGE.
 */
package org.motechproject.gateway;

import org.motechproject.model.RepeatingSchedulableJob;
import org.motechproject.model.RunOnceSchedulableJob;
import org.motechproject.model.CronSchedulableJob;

/**
 * Motech Scheduler Gateway provides access to Motech Scheduler. A proxy for that interface will be generated at run-time.
 *
 * This interface should be injected into any class that needs access to Motech Scheduler for scheduling, unscheduling and
 * rescheduling jobs/tasks.
 *
 * The interface is configured in the schedulerOutboundChannelAdapter.xml (motech-platform-core)
 *
 * For example of use see SchedulerGatewayIT (motech-platform-core)
 *
 * @author Igor (iopushnyev@2paths.com)
 * Date: 23/02/11
 *
 */
public interface MotechSchedulerGateway {

    /**
     * Sends a message with the given SchedulableJob payload. The message directed to the channel specified in the
     * a Spring Integration configuration file.
     *
     * @param cronSchedulableJob
     */
    public void scheduleJob(CronSchedulableJob cronSchedulableJob);

    /**
     * Sends a message with the given SchedulableJob payload. The message directed to the channel specified in the
     * a Spring Integration configuration file.
     *
     * @param schedulableJob
     */
    public void scheduleRepeatingJob(RepeatingSchedulableJob schedulableJob);

    /**
     * Sends a message with the given RunOnceSchedulableJob payload. The message directed to the channel specified in the
     * a Spring Integration configuration file.
     *
     * @param schedulableJob
     */
    public void scheduleRunOnceJob(RunOnceSchedulableJob schedulableJob);

    /**
     * Sends a message with the given jobID (String) payload. The message directed to the channel specified in the
     * a Spring Integration configuration file.
     *
     * @param jobId
     */
    public void unscheduleJob(String jobId);
}
